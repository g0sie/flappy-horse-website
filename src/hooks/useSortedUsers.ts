import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/utils/firebase.utils";
import { IUser } from "@/interfaces/IUser";

export function useSortedUsers() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [fetchStatus, setFetchStatus] = useState<
    "loading" | "success" | "error"
  >("loading");

  const usersCollectionRef = collection(db, "users");

  const getSortedUsersFromDb = async () => {
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
    } catch (error) {
      setFetchStatus("error");
    }
  };

  useEffect(() => {
    getSortedUsersFromDb();
  }, []);

  return {
    users,
    fetchStatus,
    refreshUsers: getSortedUsersFromDb,
  };
}
