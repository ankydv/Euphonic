import React, { useEffect, useState } from "react";
import "../styles/songList.css";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
import PlayPause from "./playPause";

const server = process.env.REACT_APP_SERVER;

const SongList = ({title, list, isLoading, }) => {
  const currMusic = useSelector((state) => state.music);

  const dispatch = useDispatch();
  const { sendMusic } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const handlePlay = (index) => {
    sendMusic(list[index]);
  };

  return isLoading ? (
    <div className="song-list-container shimmer-container">
      <div className="heading shimmer" />
      <ul className="song-list-list">
        {Array.apply(null, { length: 15 }).map((song, index) => (
          <li className="shimmer-li" key={index}>
            <div className="song-info-container">
              <div className="image shimmer"></div>
              <div className="song-info">
                <div className="song-title shimmer" />
                <div className="song-artist shimmer" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div className="song-list-container">
      <h2>{title}</h2>
      <ul className="song-list-list">
        {list.map((song, index) => (
          <li
            key={index}
            className={song.videoId === currMusic.videoId ? "active" : ""}
            onClick={() => handlePlay(index)}
          >
            <div className="song-info-container">
              <div className="image">
                <img
                  className={song.videoId === currMusic.videoId ? "active" : ""}
                  src={song.thumbnail[0].url}
                ></img>
              </div>
              {song.videoId === currMusic.videoId ? (
                <PlayPause toggle={true}></PlayPause>
              ) : null}
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

export default SongList;
