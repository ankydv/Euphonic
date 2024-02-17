import { useEffect, useState } from 'react'
import { createTheme, darken, lighten } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import axios from 'axios';

const SERVER = process.env.REACT_APP_AUTH_SERVER;

const Theme = ({ mode }) => {
  const thumbUrl = useSelector((state)=>state.musicInfo)?.lastThumbnailUrl;
  const [dominantColors, setDominantColors] = useState();

  const primaryColor = dominantColors ? dominantColors[2] :'rgb(118, 155, 249)';
  const secondaryColor = '#FF0000';
  const backgroundColor = dominantColors ? dominantColors[0] : null; 

  useEffect(()=>{
    const getDominantColor = async () => {
      if(!thumbUrl)
        return
      const res = await axios.get(`${SERVER}api/colors/color-palette?url=${thumbUrl}`);
      setDominantColors(res.data.palette);
    }
    getDominantColor();
  },[thumbUrl])

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: darken(primaryColor, 0.5)
      },
      secondary: {
        main: secondaryColor,
      },
      background: {
        default: backgroundColor?lighten(backgroundColor, 0.9): '#ffffff', 
      },
    },
  });
  
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: lighten(primaryColor, 0.5)
      },
      secondary: {
        main: secondaryColor,
      },
      background: {
        default: backgroundColor?darken(backgroundColor, 0.85):'#000000',
      },
    },
  });
  return mode == 'light' ? lightTheme : darkTheme;
}

export default Theme

