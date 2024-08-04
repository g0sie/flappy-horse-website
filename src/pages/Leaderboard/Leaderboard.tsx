import { useUsers } from "@/hooks/useUsers";
import { useAuth } from "@/hooks/useAuth";

import { Separator } from "@/components/ui/separator";

const LeaderboardPage = () => {
  const { isSignedIn } = useAuth();
  const { users, userDisplayName } = useUsers();

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
