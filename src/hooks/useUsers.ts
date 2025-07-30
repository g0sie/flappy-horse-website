import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/utils/firebase.utils";
import { IUser } from "@/interfaces/IUser";

export function useUsers() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [fetchStatus, setFetchStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const { isSignedIn, user: authenticatedUser } = useAuth();
  const [userDisplayName, setUserDisplayName] = useState<string>(null);
  const [userScore, setUserScore] = useState<number>(0);

  const usersCollectionRef = collection(db, "users");

  const getUsersFromDb = async () => {
    try {
      const res = await getDocs(
        query(usersCollectionRef, orderBy("score", "desc"))
      );
      const data: IUser[] = res.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(data);
      setFetchStatus("success");

      if (!isSignedIn) return;
      const user: IUser = data.find(
        (user) => user.id === authenticatedUser.uid
      );
      if (user && "displayName" in user) {
        setUserDisplayName(user.displayName);
      } else {
        setUserDisplayName(null);
      }
      if (user && "score" in user) {
        setUserScore(user.score);
      } else {
        setUserScore(0);
      }
    } catch (error) {
      setFetchStatus("error");
    }
  };

  useEffect(() => {
    getUsersFromDb();
  }, [isSignedIn]);

  return {
    users,
    userDisplayName,
    userScore,
    fetchStatus,
    refreshUsers: getUsersFromDb,
  };
}
