import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase.utils";

interface IUser {
  id: string;
  displayName?: string;
  score?: number;
}

const LeaderboardPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);

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
      } catch (error) {
        console.error(error);
      }
    };
    getUsersFromDb();
  }, []);

  return (
    <>
      {users.map(
        (user) =>
          user.displayName && (
            <p key={user.id} className="text-primary">
              {user.displayName} - {user.score || 0}
            </p>
          )
      )}
    </>
  );
};

export default LeaderboardPage;
