import axios from "axios";
import "../styles/musicCard.css";

import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import YouTube from 'react-youtube';

const server = process.env.REACT_APP_SERVER;

const MusicCard = () => {

  const [seekValue, setSeekValue] = useState(0);
  const currMusic = useSelector(state => state.music);
  const [playerState, setPlayerState] = useState(0);
  const [player, setPlayer] = useState(null);
  const [currDuration, setCurrDuration] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [thumbUrl, setThumbUrl] = useState(currMusic?currMusic.thumbnails[0].url : null);

  const handleSpaceKeyPress = (event) => {
    if (event.key === " ") {
      // Prevent default spacebar behavior (scrolling the page)
      event.preventDefault();
      // Toggle play/pause
      handlePlayPause();
    }
  };

  useEffect(() => {
    // Add event listener when the component mounts
    window.addEventListener("keydown", handleSpaceKeyPress);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleSpaceKeyPress);
    };
  }, [playerState]);
  
  useEffect(() => {
    if(currMusic){
      axios.get(`${server}api/songinfo/${currMusic.videoId}`)
      .then((res) => {
        setThumbUrl(res.data.videoDetails.thumbnail.thumbnails.pop().url);
      })
    }
    }, [currMusic])

  const seekTo = (event) => {
    const newValue = parseInt(event.target.value);
    setSeekValue(newValue);
    if (player) {
      const duration = player.getDuration();
      const seekTime = (newValue / 100) * duration;
      player.seekTo(seekTime, true);
    }
  };

  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }
  

  const handleReady = (event) => {
    setPlayer(event.target);
    setCurrDuration(0);
    setSeekValue(0);
    setTotalDuration(event.target.getDuration());
  }

  const handleStateChange = (event) => {
    setPlayerState(event.target.getPlayerState());
  }
  const handlePlayPause = () => {
    if(playerState === YouTube.PlayerState.PLAYING){
      player.pauseVideo();
    }
    else
      player.playVideo();
  }

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      VideoPlaybackQuality:'hd1080',
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      playsinline: 0
    }

  };

  const playPauseBtnClass = 'fa fa-'+(playerState === 1 ? "pause" : "play");
  const waveClass = playerState === 1 ? 'wave' : 'wave paused';
  return (
    <div className="music-card">
     {currMusic && <YouTube // if currMusic is present then render youtube iframe
      className="ytplayer"
      videoId={currMusic.videoId}
      opts={opts}
      onReady={handleReady}
      onStateChange={handleStateChange}
    />}
    
      <div className="image">
        {currMusic && <img
          alt="Music Art"
          src={thumbUrl}
        />}
      </div>
      <div className={waveClass}></div>
      <div className={waveClass}></div>
      <div className={waveClass}></div>
      <div className="slider_container">
      <div className="current-time">{formatTime(currDuration)}</div>
        <input
          type="range"
          min="1"
          max="100"
          value={seekValue}
          className="seek_slider"
          onChange={seekTo}
        />
        <SeekBarUpdater
        player={player}
        playerState={playerState}
        totalDuration={totalDuration}
        setCurrDuration={setCurrDuration}
        setSeekValue={setSeekValue}
      />
        <div className="current-time">{formatTime(totalDuration)}</div>
      </div>

      <div className="buttons">
        <ul className="list list--buttons" onClick={(e)=>e.preventDefault()}>
          <li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="list__link">
              <i className="fa fa-step-backward"></i>
            </a>
          </li>

          <li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="list__link" onClick={handlePlayPause}>
              <i className={playPauseBtnClass}></i>
            </a>
          </li>

          <li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="list__link">
              <i className="fa fa-step-forward"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const SeekBarUpdater = ({ player, playerState, totalDuration, setCurrDuration, setSeekValue }) => {
  const updateSeekBar = () => {
    const currentTime = player.getCurrentTime();
    if (currentTime !== null) {
      setCurrDuration(currentTime);
      setSeekValue((currentTime / totalDuration) * 100);
    }
    if (playerState === YouTube.PlayerState.PLAYING) {
      requestAnimationFrame(updateSeekBar);
    }
  };

  useEffect(() => {
    if (playerState === YouTube.PlayerState.PLAYING) {
      updateSeekBar();
    }
  }, [playerState, player, totalDuration, setCurrDuration, setSeekValue]);

  return null; // This component doesn't render anything
};

export default MusicCard;
