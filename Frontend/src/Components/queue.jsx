import React, { useEffect, useState } from "react";
import "../styles/queue.css";
import { useSelector } from "react-redux";
import axios from "axios";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
import PlayPause from "./playPause";
import { Box, List, ListItemButton, Typography } from "@mui/material";

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

  return isLoading ? (
    <Box className="up-next-container shimmer-container">
      <Box className="heading shimmer" />
      <ListItemButton className="up-next-list">
        {Array.apply(null, { length: 15 }).map((song, index) => (
          <li className="shimmer-li" key={index}>
            <Box className="song-info-container">
              <Box className="image shimmer"></Box>
              <Box className="song-info">
                <Box className="song-title shimmer" />
                <Box className="song-artist shimmer" />
              </Box>
            </Box>
          </li>
        ))}
      </ListItemButton>
    </Box>
  ) : (
    <Box className="up-next-container">
      <h2>Up Next</h2>
      <List className="up-next-list">
        {queue.map((song, index) => (
          <ListItemButton
            key={index}
            selected={index === currentIndex}
            onClick={() => handlePlay(index)}
          >
            <Box className="song-info-container">
              <Box className="image">
                <img
                  className={index === currentIndex ? "active" : ""}
                  src={song.thumbnail[0].url}
                ></img>
              </Box>
              {currentIndex === index ? (
                <PlayPause toggle={true}></PlayPause>
              ) : null}
              <Box className="song-info">
                <Typography variant="ghost" className="song-title">{song.title}</Typography>
                <Typography className="song-artist">{song.artists[0].name}</Typography>
              </Box>
            </Box>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default Queue;
