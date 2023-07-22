import "../styles/musicCard.css";

import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import YouTube from 'react-youtube';

const MusicCard = () => {

  const [seekValue, setSeekValue] = useState(0);
  const currMusic = useSelector(state => state.music);
  const [playerState, setPlayerState] = useState(0);
  const [player, setPlayer] = useState(null);
  const [currDuration, setCurrDuration] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    let interval = null;
  
    if (playerState === YouTube.PlayerState.PLAYING) {
      interval = setInterval(() => {
        console.log('Im running')
        const currentTime = player.getCurrentTime();
        if (currentTime !== null) {
          setCurrDuration(currentTime);
          setSeekValue((currentTime / player.getDuration()) * 100);
        }
      }, 100);
    }
  
    return () => clearInterval(interval);
  }, [playerState, player]);
  

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

  const handleEnd = () =>{
    setCurrDuration(totalDuration);
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

  return (
    <div className="music-card">
     {currMusic && <YouTube // if currMusic is present then render youtube iframe
      className="ytplayer"
      videoId={currMusic.videoId}
      opts={opts}
      onReady={handleReady}
      onStateChange={handleStateChange}
      onEnd={handleEnd}
    />}
      <div className="image">
        {currMusic && <img
          alt="Music Art"
          src={currMusic.thumbnails[0].url}
        />}
      </div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
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

export default MusicCard;
