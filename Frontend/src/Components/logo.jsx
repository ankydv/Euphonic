import { useNavigate } from "react-router-dom";
import "../styles/logo.css";

const logo = require("../res/logo.png");

const Logo = () => {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/');
  }
  return <img className="logo" src={logo} alt="logo" onClick={goToHome}/>;
};

export default Logo;
