import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase.utils";

import { Separator } from "@/components/ui/separator";

interface IUser {
  id: string;
  displayName?: string;
  score?: number;
}

const LeaderboardPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);
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
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUsersFromDb();
  }, []);

  const leaderboard = (
    <div>
      {users.map(
        (user) =>
          user.displayName && (
            <p key={user.id} className="text-primary">
              {user.displayName} - {user.score || 0}
            </p>
          )
      )}
    </div>
  );

  return (
    <div className="grid gap-5">
      {isSignedIn ? (
        <p className="text-primary">
          twoja nazwa: {userDisplayName || "musisz sobie ustawić nazwę"}
        </p>
      ) : (
        <p className="text-primary">zaloguj się żeby dołączyć do leaderboard</p>
      )}

      <Separator />

      {leaderboard}
    </div>
  );
};

export default LeaderboardPage;
