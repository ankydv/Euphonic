import React, { useEffect, useState } from "react";
import "../styles/queue.css";
import { useSelector } from "react-redux";
import axios from "axios";

import { useDispatch } from 'react-redux';
import { bindActionCreators } from "redux";
import { actionCreators } from '../state/index';
import PlayPause from "./playPause";

const server = process.env.REACT_APP_SERVER;

const Queue = () => {
  const currMusic = useSelector((state) => state.music);
  const queue = useSelector(state => state.queue);
  const currentIndex = useSelector(state => state.queueIndex);

  const dispatch = useDispatch();
  const { sendQueue, sendMusic,sendQueueIndex } = bindActionCreators(actionCreators, dispatch);

  const handlePlay = (index) =>{
    sendMusic(queue[index]);
    sendQueueIndex(index);
  }

  useEffect(() => {
    const isSongInQueue = queue.some(
      (song) => song.videoId === currMusic.videoId
    );
    if (!isSongInQueue) {
      axios.get(`${server}api/watchlist/${currMusic.videoId}`)
      .then((res) => {
        sendQueue(res.data.tracks);
        sendQueueIndex(0);
      })
    }
  }, [currMusic,queue]);

  return (
    <div className="up-next-container">
      <h2>Up Next</h2>
      <ul className="up-next-list">
        {queue.map((song, index) => (
          <li key={index} className={index === currentIndex ? "active" : ""} onClick={() => handlePlay(index)}>
            <div className="song-info-container">
              <div className="image">
              <img className={index === currentIndex ? "active" : ""} src={song.thumbnail[0].url}></img>
              </div>
              {currentIndex === index? <PlayPause toggle = {true}></PlayPause> : null}
            <div className="song-info">
              <span className="song-title">{song.title}</span>
              <span className="song-artist">{song.artists[0].name}</span>
            </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Queue;
