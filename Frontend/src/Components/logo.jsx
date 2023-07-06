import "../styles/logo.css";

const logo = require("../res/logo.png");

const Logo = () => {
  return <img className="logo" src={logo} alt="logo" />;
};

export default Logo;
