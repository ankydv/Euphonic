import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import SongList from './SongList';
import { MusicCards } from './recommendation';

const ArtistInfo = () => {

    const server = process.env.REACT_APP_SERVER;
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    var searchQuery = searchParams.get("q");
    const [artistinfo, setArtistInfo] = useState();

    const name = artistinfo ? artistinfo.name : "Loading";
    const songList = artistinfo ? artistinfo.songs.results : [];
    useEffect(() => {
        if (searchQuery != null) {
          setIsLoading(true);
          const baseUrl = `${server}api/artistinfo/${searchQuery}`;
          axios.get(baseUrl).then((res) => {
            setArtistInfo(res.data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Request error:", error.message);
          });
        }
      }, [searchQuery]);

  return (
    <div>
         <SongList title={name} isLoading={isLoading} list={songList} />
         {artistinfo && <MusicCards title={'Albums'} dataSet={artistinfo.albums.results} isLoading={false} />}
         {artistinfo && <MusicCards title={'Singles'} dataSet={artistinfo.singles.results} isLoading={false} />}
         {artistinfo && <MusicCards title={'Videos'} dataSet={artistinfo.videos.results} isLoading={false} />}
    </div>
  )
}

export default ArtistInfo