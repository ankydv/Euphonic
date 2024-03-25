import MusicCard from "../Components/musicCard";
import "../styles/bodyContent.css";
import MyRoutes from "../Routes.js";
import { useSelector } from "react-redux";
import Queue from "./queue";
import { useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import Video from "./Video.jsx";
import MiniDrawer from "./MiniSideBar.jsx";
import { Box, useTheme } from "@mui/material";

const BodyContent = () => {
  const currMusic = useSelector((state) => state.music);
  const musicInfo = useSelector((state) => state.musicInfo);
  const isVideoSwitchedOn = useSelector((state) => state.isVideoSwitchedOn);
  const isVideoPictureInPicure = useSelector((state) => state.isVideoPictureInPicure);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const bodyClass = `bodyContent ${currMusic ? "" : "noMusic"}`;
  const isMobileMode = useSelector((state) => state.isMobileMode);

  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isNotHome = location.pathname !== "/";

  const [isVideo, setIsVideo] = useState(false);

      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);
      const musicCardTop = computedStyle.getPropertyValue('--music-card-top').trim();
      const playerBarHeight = computedStyle.getPropertyValue('--player-bar-height').trim();

    useEffect(() => {
        setIsVideo(musicInfo && musicInfo.videoDetails.musicVideoType !=="MUSIC_VIDEO_TYPE_ATV");
    }, [musicInfo])
    const shouldRender = isVideo && isVideoSwitchedOn && isLoggedIn;

    useEffect(() => {
      const exitPipMode = async () => {
        try {
          if (document.pictureInPictureElement && !shouldRender) {
            await document.exitPictureInPicture();
          }
        } catch (error) {
          console.error('Error toggling PiP mode:', error);
        }
      };
      exitPipMode();
    }, [shouldRender]);
  return (
    <Box sx={{ display: 'flex' }}>
    <MiniDrawer />
    {/* <Box component="main" sx={{  p: 3 }}> */}
    <div className={bodyClass}>
      <div>
      {currMusic && <MusicCard />}
      </div>
      <div className={`routes ${shouldRender && !isVideoPictureInPicure ? 'disable' : ''}`} style={{height: `calc(100vh - ${(!isMobileMode && currMusic)?playerBarHeight:'0px'} - ${musicCardTop})`, paddingBottom: '14px'}}>
        {isNotHome && (
          <div className="navigation">
            <BsFillArrowLeftCircleFill
              className="button"
              size={30}
              color={theme.palette.primary.main}
              onClick={() => navigate(-1)}
              title="Go back"
            ></BsFillArrowLeftCircleFill>
          </div>
        )}
        <MyRoutes />
        {shouldRender && <Video />}
      </div>
      <div>
      {currMusic && <Queue />}
      </div>
    </div>
    {/* </Box> */}
    </Box>
  );
};

export default BodyContent;
