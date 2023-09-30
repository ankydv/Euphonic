import "../styles/variables.css";
import "../styles/profileIcon.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../state/action-creators";
import { useDispatch } from "react-redux";

const ProfileIcon = () => {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleProfile = () =>{
    window.open('https://inotebook-496bd.web.app/signup', '_blank');
  }

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
    }

  return (
    <>
    {isLoggedIn?
    <>
    <div className="profileIcon" onClick={handleProfile}>
      <div className="headIcon"></div>
      <div className="bodyIcon" />
    </div>
    <button onClick={handleLogout}>Logout</button>
    </>
    :
    <Link to='/login'>Login</Link>
    }
    </>
  );
};

export default ProfileIcon;
