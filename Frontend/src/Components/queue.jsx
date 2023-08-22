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

  const handleNextSong = () => {
    sendQueueIndex((prevIndex) => prevIndex + 1);
    handlePlay(currentIndex+1);
  };

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
              <img className = "image" src={song.thumbnail[0].url}></img>
              {currentIndex === index? <PlayPause toggle = {true}></PlayPause> : null}
            <div className="song-info">
              <span className="song-title">{song.title}</span><br/>
              <span className="song-artist">{song.artists[0].name}</span>
            </div>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={handleNextSong}
        disabled={currentIndex === queue.length - 1}
      >
        Next Song
      </button>
    </div>
  );
};

export default Queue;
