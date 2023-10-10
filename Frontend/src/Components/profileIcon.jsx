import "../styles/variables.css";
import "../styles/profileIcon.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../state/action-creators";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const  SERVER = process.env.REACT_APP_AUTH_SERVER;

const ProfileIcon = () => {

  const [currUser, setCurrUser] = useState(null);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const headers = {
      'auth-token': localStorage.getItem('token')
    };
  
    axios.post(`${SERVER}api/auth/getuser`, {}, { headers })
      .then(res => {
        setCurrUser(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [isLoggedIn]);
  

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
      {currUser && <h3>{currUser['name'].charAt(0).toUpperCase()}</h3>}
    </div>
    <button onClick={handleLogout}>Logout</button>
    <Link to='/history'>History</Link>
    </>
    :
    <Link to='/login'>Login</Link>
    }
    </>
  );
};

export default ProfileIcon;
