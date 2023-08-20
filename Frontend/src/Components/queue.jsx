import React, { useEffect, useState } from "react";
import "../styles/queue.css";
import { useSelector } from "react-redux";
import axios from "axios";

import { useDispatch } from 'react-redux';
import { bindActionCreators } from "redux";
import { actionCreators } from '../state/index';

const server = process.env.REACT_APP_SERVER;

const Queue = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currMusic = useSelector((state) => state.music);
  // const [queue, setQueue] = useState([]);
  const queue = useSelector(state => state.queue);

  const dispatch = useDispatch();
  const { sendQueue, sendMusic } = bindActionCreators(actionCreators, dispatch);

  const handleNextSong = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    handlePlay(currentIndex+1);
  };

  const handlePlay = (index) =>{
    sendMusic(queue[index]);
    setCurrentIndex(index);
  }

  useEffect(() => {
    const isSongInQueue = queue.some(
      (song) => song.videoId === currMusic.videoId
    );
    if (!isSongInQueue) {
      axios.get(`${server}api/watchlist/${currMusic.videoId}`)
      .then((res) => {
        sendQueue(res.data.tracks);
        setCurrentIndex(0);
      })
    }
  }, [currMusic,queue]);

  return (
    <div className="up-next-container">
      <h2>Up Next</h2>
      <ul className="up-next-list">
        {queue.map((song, index) => (
          <li key={index} className={index === currentIndex ? "active" : ""} onClick={() => handlePlay(index)}>
            <div className="song-info">
              <span className="song-title">{song.title}</span>
              <span className="song-artist">{song.artists[0].name}</span>
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
