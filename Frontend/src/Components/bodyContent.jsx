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
import { Box } from "@mui/material";

const BodyContent = () => {
  const currMusic = useSelector((state) => state.music);
  const musicInfo = useSelector((state) => state.musicInfo);
  const isVideoSwitchedOn = useSelector((state) => state.isVideoSwitchedOn);
  const isVideoPictureInPicure = useSelector((state) => state.isVideoPictureInPicure);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const bodyClass = `bodyContent ${currMusic ? "" : "noMusic"}`;

  const navigate = useNavigate();
  const location = useLocation();
  const isNotHome = location.pathname !== "/";

  const [isVideo, setIsVideo] = useState(false);

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
      <div className={`routes ${shouldRender && !isVideoPictureInPicure ? 'disable' : ''}`}>
        {isNotHome && (
          <div className="navigation">
            <BsFillArrowLeftCircleFill
              className="button"
              size={30}
              color="#f52a99"
              onClick={() => navigate(-1)}
            ></BsFillArrowLeftCircleFill>

            <BsFillArrowRightCircleFill
              className="button"
              size={30}
              color="#f52a99"
              onClick={() => navigate(1)}
            ></BsFillArrowRightCircleFill>
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
