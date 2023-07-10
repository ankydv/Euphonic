import "../styles/musicCard.css";

import { useState } from "react";

const MusicCard = () => {

  const [seekValue, setSeekValue] = useState(0);
  const [currentMusic, setCurrentMusic] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const seekTo = (event) => {
    const newValue = parseInt(event.target.value);
    setSeekValue(newValue);
  };

  return (
    <div className="music-card">
      <div className="image">
        <img
          alt="Music Art"
          src="https://images-na.ssl-images-amazon.com/images/I/513VUhBNJzL.jpg"
        />
      </div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="slider_container">
        <div className="current-time">00:00</div>
        <input
          type="range"
          min="1"
          max="100"
          value={seekValue}
          className="seek_slider"
          onChange={seekTo}
        />
        <div className="total-duration">00:00</div>
      </div>

      <div className="buttons">
        <ul className="list list--buttons">
          <li>
            <a href="#" className="list__link">
              <i className="fa fa-step-backward"></i>
            </a>
          </li>

          <li>
            <a href="#" className="list__link">
              <i className="fa fa-play"></i>
            </a>
          </li>

          <li>
            <a href="#" className="list__link">
              <i className="fa fa-step-forward"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MusicCard;
