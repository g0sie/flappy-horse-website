import RefreshIcon from "@/components/RefreshIcon/RefreshIcon";
import { Button } from "@/components/ui/button";

import { IUser } from "@/interfaces/IUser";

interface LeaderBoardTableProps {
  users: IUser[];
  fetchStatus: "loading" | "success" | "error";
  refreshUsers: () => Promise<void>;
}

function LeaderBoardTable({
  users,
  fetchStatus,
  refreshUsers,
}: LeaderBoardTableProps) {
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
      <div className="flex justify-center mt-3">
        <Button onClick={refreshUsers} className="p-5">
          <RefreshIcon />
        </Button>
      </div>
    </div>
  );
}

export default LeaderBoardTable;
