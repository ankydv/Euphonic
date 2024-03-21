import React, { useEffect, useState } from "react";
import "../styles/queue.css";
import { useSelector } from "react-redux";
import axios from "axios";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
import { Box } from "@mui/material";
import SongList from "./SongList";

const server = process.env.REACT_APP_SERVER;

const Queue = () => {
  const [isLoading, setIsLoading] = useState(true);
  const currMusic = useSelector((state) => state.music);
  const queue = useSelector((state) => state.queue);
  const isMobileMode = useSelector((state) => state.isMobileMode);

  const dispatch = useDispatch();
  const { sendQueue, sendMusic, sendQueueIndex } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const handlePlay = (index) => {
    sendMusic(queue[index]);
    sendQueueIndex(index);
  };

  useEffect(() => {
    const isSongInQueue = queue.some(
      (song, index) => {
        if(song.videoId === currMusic?.videoId){
          sendQueueIndex(index);
          return true;
        }
        return false;
      }
    );
    if (!isSongInQueue && currMusic && !currMusic.shouldNotLoadQueue) {
      setIsLoading(true);
      axios.get(`${server}api/watchlist/${currMusic.videoId}`).then((res) => {
        sendQueue(res.data.tracks);
        sendQueueIndex(0);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Request error:", error.message);
      });
    }
    else
      setIsLoading(false)
  }, [currMusic, queue]);

      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);
      const musicCardTop = computedStyle.getPropertyValue('--music-card-top').trim();
  return (
    <Box className = "up-next-container" sx={{height: `calc(100vh - ${(!isMobileMode && currMusic)?'65px':'0px'} - ${musicCardTop})`}}>
      <SongList title={'Up Next'} list={queue} isLoading={isLoading} isQueue={true} />
    </Box>
  )
};

export default Queue;
