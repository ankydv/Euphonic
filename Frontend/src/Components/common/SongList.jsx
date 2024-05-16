import React, { useEffect } from "react";
import "../styles/songList.css";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";
import { Box, List, ListItemButton } from "@mui/material";

const SongList = ({ title, list, isLoading, shimmerLength, handleSongClick, isQueue }) => {
  const currMusic = useSelector((state) => state.music);

  const dispatch = useDispatch();
  const { sendMusic } = bindActionCreators(actionCreators, dispatch);

  const handleSongSelect = (song, index) => {
    if(!handleSongClick)
      sendMusic(song);
    else
      handleSongClick(song, index)
  };

  const findSongLoc = (root) => {
    return root.music ? root.music : root
  }

  return isLoading ? (
    <Box className="song-list-container shimmer-container">
      <Box className="heading shimmer" />
      <List className="song-list-list">
        {Array.apply(null, { length: shimmerLength?shimmerLength : 15 }).map((song, index) => (
          <ListItemButton className="shimmer-ListItemButton" key={index}>
            <Box className="song-info-container">
              <Box className="image shimmer"></Box>
              <Box className="song-info">
                <Box className="song-title shimmer" />
                <Box className="song-artist shimmer" />
              </Box>
            </Box>
          </ListItemButton>
        ))}
      </List>
    </Box>
  ) : (
    list != [] && (
      <Box className="song-list-container">
        <h2>{title}</h2>
        <List className="song-list-list">
          {list.map((song, index) => (
            <ListItemButton key={index} selected={isQueue && currMusic?.videoId === findSongLoc(song).videoId} onClick={() => handleSongSelect(findSongLoc(song), index)}>
              <Box className="song-info-container">
                <Box className="image">
                  <img
                    className={
                      currMusic && findSongLoc(song).videoId === currMusic.videoId
                        ? "active"
                        : ""
                    }
                    src={
                      findSongLoc(song).thumbnails
                        ? findSongLoc(song).thumbnails[0].url
                        : findSongLoc(song).thumbnail && findSongLoc(song).thumbnail[0].url
                    }
                  ></img>l
                  {currMusic && findSongLoc(song).videoId === currMusic.videoId && (
                  <div className="music-animation">
                    <iframe style={{width: '100%', height: '100%'}} src="https://lottie.host/embed/cbe6b02b-aa3a-49d0-a453-d86309f0d3a0/Lp7WR9eOSy.json"></iframe>
                  </div>
                )}
                </Box>
                <Box className="song-info">
                  <span className="song-title">{findSongLoc(song).title}</span>
                  <span className="song-artist">
                    {findSongLoc(song).artists[0] && findSongLoc(song).artists[0].name}
                  </span>
                </Box>
              </Box>
            </ListItemButton>
          ))}
        </List>
      </Box>
    )
  );
};

export default SongList;
