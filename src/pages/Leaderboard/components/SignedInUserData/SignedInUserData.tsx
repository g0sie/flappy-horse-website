import { useSortedUsers } from "@/hooks/useSortedUsers";
import { useSignedInUser } from "@/hooks/useSignedInUser";

import DisplayNameForm from "@/components/DisplayNameForm/DisplayNameForm";

function SignedInUserData() {
  const { refreshUsers } = useSortedUsers();
  const { userDisplayName, userScore, fetchStatus, refreshSignedInUser } =
    useSignedInUser();

  async function refreshData() {
    refreshUsers();
    refreshSignedInUser();
  }

  if (fetchStatus === "not signed in") {
    return (
      <p className="text-primary">zaloguj się żeby dołączyć do leaderboard</p>
    );
  }

  if (fetchStatus === "loading") {
    return <p className="text-primary">loading...</p>;
  }

  if (fetchStatus === "error") {
    return <p className="text-primary">coś poszło nie tak :(</p>;
  }

  if (userDisplayName == null) {
    return <DisplayNameForm refreshData={refreshData} />;
  }

  return (
    <div>
      <p className="text-primary">twoja nazwa: {userDisplayName}</p>
      <p className="text-primary">twój wynik: {userScore}</p>
    </div>
  );
}

export default SignedInUserData;
