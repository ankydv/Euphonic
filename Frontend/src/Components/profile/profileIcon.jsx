import "../styles/variables.css";
import "../styles/profileIcon.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { LuMoon, LuSun } from "react-icons/lu";
import { IconButton, Typography, useTheme } from "@mui/material";

const  SERVER = process.env.REACT_APP_AUTH_SERVER;

const ProfileIcon = () => {

  const [currUser, setCurrUser] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const theme = useSelector((state) => state.theme);
  const navigate = useNavigate();
  const themePalette = useTheme();

  const dispatch = useDispatch();
  const { sendTheme } = bindActionCreators(
    actionCreators,
    dispatch
  );
  console.log(currUser)
  const handleSwitch = () => {
    document.body.style.transition = 'background-color 0ms';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 2);
    sendTheme(theme === 'dark' ? 'light': 'dark')
  }
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
    <div className="profileIcon">
      <IconButton title={theme === 'dark' ? "Light theme" : "Dark theme"} onClick={handleSwitch}>
        {theme === 'dark' ? <LuSun size={25} /> : <LuMoon size={25} color="black" />}
      </IconButton>
      {
      isLoggedIn ? currUser && <Avatar
        sx={{ bgcolor: themePalette.palette.primary.main, cursor: 'pointer' }}
        title='Profile'
        // src="/broken-image.jpg"
        onClick={handleProfile}
      ><Typography>{currUser['firstName']?.charAt(0).toUpperCase()}</Typography>
        </Avatar>
        :
        <Button variant="outlined" color="secondary" size="large" sx={{color:'white', borderColor: 'white'}} onClick={(() => navigate('/login'))} >Login</Button>
        }
    </div>
  );
};

export default ProfileIcon;
