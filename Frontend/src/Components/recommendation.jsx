import React, { useEffect, useState } from "react";
import "../styles/musicRecommendation.css"; // Import the CSS file for styling
// import "../styles/musicCard.css"

import { useDispatch } from 'react-redux';
import { bindActionCreators } from "redux";
import { actionCreators } from '../state/index';
import axios from "axios";
import { sample_dataset } from "./helpers/sample";
import { useNavigate } from "react-router-dom";

 const server = process.env.REACT_APP_SERVER;

const MusicRecommendation = () => {

  const [charts, setCharts] = useState(sample_dataset);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${server}api/charts`)
    .then((res) => {
      setCharts(res.data);
      setIsLoading(false);
    })
  }, [])

  return (
    <div className="music-recommendation">
        {
        charts!==null &&
        Object.entries(charts).map(([chartKey, chartData], index) => (
          chartData.items && <MusicCards
           key={index} 
           title={chartKey} 
           dataSet={chartData.items}
           isLoading={isLoading} />
        ))}
    </div>
  );
};

export default MusicRecommendation;

const MusicCardItem = ({ music, isLoading, itemType }) => {
  const dispatch = useDispatch();
  const { sendMusic } = bindActionCreators(actionCreators, dispatch);
  const navigate = useNavigate();

  const type = itemType ? itemType.toLowerCase() : null;
  const isAlbum = music.resultType=='album' || type == 'albums';
  const isArtist = music.resultType=='artist' || type == 'artists' || type == 'related';

  const handlePlay = (music) =>{
    console.log(itemType)
    if(type =='songs' || type == 'videos' || type == 'trending' || music.videoId)
      sendMusic(music)
    else if(isArtist)
      navigate(`/artist?q=${music.browseId?music.browseId:music.artists[0].id}`);
    else if(isAlbum)
      navigate(`/album?q=${music.browseId}`);
  }

  const imgClass = isArtist ? "image shimmer artist" : "image shimmer";
  return (
    isLoading ?
    <div className="music-card-item shimmer-container">
      <div className={imgClass}/>
      <div className="music-details">
      <div className="song-title shimmer" />
        {music.artists && (
          <div className="song-artist shimmer" />
        )}
      </div>
      <div className="onCardButton" onClick={() => handlePlay(music)}>
        <ul className="list list--buttons">
          <li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="list__link">
              <i className="fa fa-play"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    :
    <div className="music-card-item" onClick={() => handlePlay(music)}>
      <div className={imgClass}>
        <img src={
          (music.thumbnails[1])?
            music.thumbnails[1].url
          :                               // Ternary operator to check if high quality thumbnail is available and set.
            music.thumbnails[0].url
        } alt={music.title} />
      </div>
      <div className="music-details">
        <p>{music.resultType == 'artist'? music.artist : music.title}</p>
        {music.artists && (
          <p>
            {music.artists.map((artist, index) => (
              <span key={index}>{artist.name}{index!==music.artists.length-1 && <span>, </span>}</span>
            ))
            }
          </p>
        )}
      </div>
      <div className="onCardButton" onClick={() => handlePlay(music)}>
        <ul className="list list--buttons">
          <li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="list__link">
              <i className="fa fa-play"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const MusicCards = ({ title, dataSet, isLoading }) => {
  const handleViewAll = ()=>{
    console.log('ankit')
  }
  return (
    isLoading ? 
    <div className="music-cards-container shimmer-container">
      <div className="heading shimmer"/>
      <div className="music-cards shimmer-container">
        {dataSet.map((music, index) => (
          <MusicCardItem
            key={index}
            music={music}
            isLoading={true}
            // handlePlay={handlePlay} // Pass the handlePlay function from parent component
          />
        ))}
      </div>
    </div>
    :
    <div className="music-cards-container">
      <div className="musicCards-header">
      <h2>{title}</h2><button onClick={handleViewAll}>View All</button>
      </div>
      <div className="music-cards">
        {dataSet.map((music, index) => (
          <MusicCardItem
            isLoading={false}
            key={index}
            music={music}
            itemType = {title}
            // handlePlay={handlePlay} // Pass the handlePlay function from parent component
          />
        ))}
      </div>
    </div>
  );
};

export {MusicCards};