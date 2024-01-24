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

const BodyContent = () => {
  const currMusic = useSelector((state) => state.music);
  const musicInfo = useSelector((state) => state.musicInfo);
  const videoToggles = useSelector((state) => state.videoToggles);
  const bodyClass = `bodyContent ${currMusic ? "" : "noMusic"}`;

  const navigate = useNavigate();
  const location = useLocation();
  const isNotHome = location.pathname !== "/";

  const [isVideo, setIsVideo] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

    useEffect(() => {
        setIsVideo(musicInfo && musicInfo.videoDetails.musicVideoType !=="MUSIC_VIDEO_TYPE_ATV");
    }, [musicInfo])

    const handleClose = () => {
      setIsVideoEnabled(false);
    };
   useEffect(() => {
    console.log(videoToggles.isPictureInPicure);
   }, [videoToggles])
  return (
    <div className={bodyClass}>
      <div>
      {currMusic && <MusicCard />}
      </div>
      <div className={`routes ${isVideo && isVideoEnabled ? 'disable' : ''}`}>
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
        {isVideo && isVideoEnabled && <Video onClose={handleClose} />}
      </div>
      <div>
      {currMusic && <Queue />}
      </div>
    </div>
  );
};

export default BodyContent;
