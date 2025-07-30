import { Separator } from "@/components/ui/separator";
import SignedInUserData from "./components/SignedInUserData/SignedInUserData";
import LeaderBoardTable from "./components/LeaderBoardTable/LeaderBoardTable";

const LeaderboardPage = () => {
  return (
    <div className="grid gap-5 max-w-[90%]">
      <SignedInUserData />
      <Separator />
      <LeaderBoardTable />
    </div>
  );
};

export default LeaderboardPage;
