import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase.utils";
import { IUser } from "@/interfaces/IUser";

export function useUsers() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isFetchError, setIsFetchError] = useState(false);
  const { isSignedIn, user: authenticatedUser } = useAuth();
  const [userDisplayName, setUserDisplayName] = useState<string>(null);

  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsersFromDb = async () => {
      try {
        const res = await getDocs(usersCollectionRef);
        const data: IUser[] = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUsers(data);
        const user: IUser = data.find(
          (user) => user.id === authenticatedUser.uid
        );
        if (user && "displayName" in user) {
          setUserDisplayName(user.displayName);
        } else {
          setUserDisplayName(null);
        }
      } catch (error) {
        setIsFetchError(true);
      }
    };
    getUsersFromDb();
  }, [isSignedIn]);

  return {
    users,
    userDisplayName,
    isFetchError,
  };
}
