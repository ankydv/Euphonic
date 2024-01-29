import "../styles/variables.css";
import "../styles/profileIcon.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import Button from '@mui/material/Button';


const  SERVER = process.env.REACT_APP_AUTH_SERVER;

const ProfileIcon = () => {

  const [currUser, setCurrUser] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

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
    console.log('To be developed')
  }

  return (
    <div className="profileIcon" onClick={handleProfile}>
      {
      isLoggedIn ? currUser && <Avatar
        sx={{ bgcolor: deepPurple[500], cursor: 'pointer' }}
        alt="Remy Sharp"
        src="/broken-image.jpg"
      >{currUser['name'].charAt(0).toUpperCase()}
        </Avatar>
        :
        <Button variant="outlined" color="secondary" size="large" sx={{color:'white', borderColor: 'white'}} onClick={(() => navigate('/login'))} >Login</Button>
        }
    </div>
  );
};

export default ProfileIcon;
