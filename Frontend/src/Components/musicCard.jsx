import "../styles/musicCard.css";

const MusicCard = () => {
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
          value="0"
          className="seek_slider"
          onchange="seekTo()"
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
