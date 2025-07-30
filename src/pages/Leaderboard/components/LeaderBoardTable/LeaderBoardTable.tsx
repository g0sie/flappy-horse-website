import { useSortedUsers } from "@/hooks/useSortedUsers";

function LeaderBoardTable() {
  const { users, fetchStatus } = useSortedUsers();

  if (fetchStatus === "loading") {
    return <p className="text-primary">loading...</p>;
  }

  if (fetchStatus === "error") {
    return <p className="text-primary">coś poszło nie tak :(</p>;
  }

  return (
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
}

export default LeaderBoardTable;
