import { Separator } from "@/components/ui/separator";
import SignedInUserData from "./components/SignedInUserData/SignedInUserData";
import LeaderBoardTable from "./components/LeaderBoardTable/LeaderBoardTable";

import { useSortedUsers } from "@/hooks/useSortedUsers";
import { useSignedInUser } from "@/hooks/useSignedInUser";

const LeaderboardPage = () => {
  const {
    users,
    fetchStatus: usersFetchStatus,
    refreshUsers,
  } = useSortedUsers();
  const {
    userDisplayName,
    userScore,
    fetchStatus: userFetchStatus,
    refreshSignedInUser,
  } = useSignedInUser();

  async function refreshData() {
    refreshUsers();
    refreshSignedInUser();
  }

  return (
    <div className="grid gap-5 max-w-[90%]">
      <SignedInUserData
        userDisplayName={userDisplayName}
        userScore={userScore}
        fetchStatus={userFetchStatus}
        refreshData={refreshData}
      />

      <Separator />

      <LeaderBoardTable
        users={users}
        fetchStatus={usersFetchStatus}
        refreshUsers={refreshUsers}
      />
    </div>
  );
};

export default LeaderboardPage;
