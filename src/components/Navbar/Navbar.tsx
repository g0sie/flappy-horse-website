import { Button } from "../ui/button";
import Logo from "./Logo";
import { Link } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { setUser, removeUser } from "@/redux/slices/userSlice";

import { signInWithGooglePopup } from "@/utils/firebase.utils";
import { getAuth, signOut } from "firebase/auth";

import "./Navbar.css";

const Navbar = () => {
  const { isSignedIn } = useAuth();
  const dispatch = useAppDispatch();

  function handleSignIn() {
    signInWithGooglePopup()
      .then((response) => {
        dispatch(setUser(response.user));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleSignOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="navbar">
      <Logo />

      <div className="flex gap-3">
        <Link to={"/leaderboard"}>
          <Button variant="outline">leaderboard</Button>
        </Link>

        {isSignedIn ? (
          <Button onClick={handleSignOut}>wyloguj się</Button>
        ) : (
          <Button onClick={handleSignIn}>zaloguj się :)</Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
