import React from 'react'

const AlbumList = ({ title, list, isLoading, shimmerLength }) => {
  return isLoading ? (
    <div className="song-list-container shimmer-container">
      <div className="heading shimmer" />
      <ul className="song-list-list">
        {Array.apply(null, { length: shimmerLength?shimmerLength : 15 }).map((song, index) => (
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
    list != [] && (
      <div className="song-list-container">
        <h2>{title}</h2>
        <ul className="song-list-list">
          {list.map((song, index) => (
            <li key={index} onClick={() => sendMusic(findSongLoc(song))}>
              <div className="song-info-container">
                <div className="image">
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
                </div>
                {currMusic && findSongLoc(song).videoId === currMusic.videoId && (
                  <PlayPause toggle={true}></PlayPause>
                )}
                <div className="song-info">
                  <span className="song-title">{findSongLoc(song).title}</span>
                  <span className="song-artist">
                    {findSongLoc(song).artists[0] && findSongLoc(song).artists[0].name}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

export default AlbumList