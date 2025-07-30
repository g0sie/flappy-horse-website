import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/utils/firebase.utils";
import { IUser } from "@/interfaces/IUser";

export function useSignedInUser() {
  const [fetchStatus, setFetchStatus] = useState<
    "loading" | "success" | "error" | "not signed in"
  >("loading");
  const { isSignedIn, user: authenticatedUser } = useAuth();
  const [userDisplayName, setUserDisplayName] = useState<string>(null);
  const [userScore, setUserScore] = useState<number>(0);

  const usersCollectionRef = collection(db, "users");

  const getSignedInUserFromDb = async () => {
    try {
      if (!isSignedIn) {
        setFetchStatus("not signed in");
        return;
      }

      const res = await getDocs(query(usersCollectionRef));
      const data: IUser[] = res.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
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

      setFetchStatus("success");
    } catch (error) {
      setFetchStatus("error");
    }
  };

  useEffect(() => {
    getSignedInUserFromDb();
  }, [isSignedIn]);

  return {
    userDisplayName,
    userScore,
    fetchStatus,
    refreshSignedInUser: getSignedInUserFromDb,
  };
}
