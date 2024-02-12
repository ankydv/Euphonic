import React, { useEffect, useState } from "react";
import "../styles/queue.css";
import { useSelector } from "react-redux";
import axios from "axios";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
import PlayPause from "./playPause";
import { Box, List, ListItemButton, Typography } from "@mui/material";
import SongList from "./SongList";

const server = process.env.REACT_APP_SERVER;

const Queue = () => {
  const [isLoading, setIsLoading] = useState(true);
  const currMusic = useSelector((state) => state.musicInfo);
  const queue = useSelector((state) => state.queue);
  const currentIndex = useSelector((state) => state.queueIndex);

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
        if(song.videoId === currMusic.videoDetails.videoId){
          sendQueueIndex(index);
          return true;
        }
        return false;
      }
    );
    if (!isSongInQueue && currMusic) {
      setIsLoading(true);
      axios.get(`${server}api/watchlist/${currMusic.videoDetails.videoId}`).then((res) => {
        sendQueue(res.data.tracks);
        sendQueueIndex(0);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Request error:", error.message);
      });
    }
  }, [currMusic, queue]);

  return (
    <Box className = "up-next-container">
      <SongList title={'Up Next'} list={queue} isLoading={isLoading} isQueue={true} />
    </Box>
  )
};

export default Queue;
