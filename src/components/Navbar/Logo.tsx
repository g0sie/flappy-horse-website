import { Link } from "react-router-dom";

import logo from "@/assets/logo.png";

const Logo = () => {
  return (
    <Link to={"/"} className="logo">
      <img className="logo__img" src={logo} alt="Logo" />
      <h1 className="logo__text">flappy horse</h1>
    </Link>
  );
};

export default Logo;
