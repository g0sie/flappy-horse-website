import logo from "@/assets/logo.png";

const Logo = () => {
  return (
    <div className="logo">
      <img className="logo__img" src={logo} alt="Logo" />
      <h1 className="logo__text">flappy horse</h1>
    </div>
  );
};

export default Logo;
