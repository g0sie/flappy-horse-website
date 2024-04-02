import { Button } from "../ui/button";
import Logo from "./Logo";

import { signInWithGooglePopup } from "@/utils/firebase.utils";

import "./Navbar.css";

const Navbar = () => {
  async function logGoogleUser() {
    const response = await signInWithGooglePopup();
    console.log(response);
  }

  return (
    <div className="navbar">
      <Logo />

      <Button onClick={logGoogleUser}>Zaloguj się :)</Button>
    </div>
  );
};

export default Navbar;
