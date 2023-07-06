import React from "react";
import "../styles/musicRecommendation.css"; // Import the CSS file for styling

  // Sample music recommendations data
  const musicRecommendations = [
    { title: "Song 1", artist: "Artist 1", cover: "cover1.jpg" },
    { title: "Song 2", artist: "Artist 2", cover: "cover2.jpg" },
    { title: "Song 3", artist: "Artist 3", cover: "cover3.jpg" },
    { title: "Song 4", artist: "Artist 4", cover: "cover4.jpg" },
    { title: "Song 5", artist: "Artist 5", cover: "cover5.jpg" },
    { title: "Song 6", artist: "Artist 6", cover: "cover6.jpg" },
    { title: "Song 6", artist: "Artist 6", cover: "cover6.jpg" },
    { title: "Song 6", artist: "Artist 6", cover: "cover6.jpg" },
    { title: "Song 6", artist: "Artist 6", cover: "cover6.jpg" }
    // Add more music recommendations as needed
  ];

  const imgUrl = "https://images-na.ssl-images-amazon.com/images/I/513VUhBNJzL.jpg";

const MusicRecommendation = () => {

  return (
    <div className="music-recommendation">
        <MusicCards title="Ankit"/>
        <MusicCards title="TEst"/>
        <MusicCards title="TEst"/>
        <MusicCards title="TEst"/>
        <MusicCards title="TEst"/>
    </div>
  );
};

export default MusicRecommendation;

const MusicCards = ({title})=>{
  return(
    <div className="music-cards-container">
      <h2>{title}</h2>
    <div className="music-cards">
          {musicRecommendations.map((music, index) => (
            <div className="music-card" key={index}>
              <img src={imgUrl} alt={music.title} />
              <div className="music-details">
                <h3>{music.title}</h3>
                <p>{music.artist}</p>
              </div>
            </div>
          ))}
        </div>
        </div>
  );
}

export {MusicCards};