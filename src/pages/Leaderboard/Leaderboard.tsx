import { useUsers } from "@/hooks/useUsers";
import { useAuth } from "@/hooks/useAuth";

import { Separator } from "@/components/ui/separator";
import DisplayNameForm from "@/components/DisplayNameForm/DisplayNameForm";

const LeaderboardPage = () => {
  const { isSignedIn } = useAuth();
  const { users, userDisplayName, fetchStatus } = useUsers();

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

  if (fetchStatus === "loading") {
    return <p className="text-primary">loading...</p>;
  }

  if (fetchStatus === "error") {
    return <p className="text-primary">coś poszło nie tak :(</p>;
  }

  return (
    <div className="grid gap-5 max-w-[90%]">
      {isSignedIn ? (
        userDisplayName == null ? (
          <DisplayNameForm />
        ) : (
          <p className="text-primary">twoja nazwa: {userDisplayName}</p>
        )
      ) : (
        <p className="text-primary">zaloguj się żeby dołączyć do leaderboard</p>
      )}

      <Separator />

      {leaderboard}
    </div>
  );
};

export default LeaderboardPage;
