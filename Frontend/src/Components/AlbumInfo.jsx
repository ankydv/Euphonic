import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import SongList from './SongList';

const AlbumInfo = () => {
    const server = process.env.REACT_APP_SERVER;
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    var searchQuery = searchParams.get("q");
    const [albumInfo, setAlbumInfo] = useState();

    const name = albumInfo ? albumInfo.title : "Loading";
    const songList = albumInfo ? albumInfo.tracks : [];
    useEffect(() => {
        if (searchQuery != null) {
          setIsLoading(true);
          const baseUrl = `${server}api/albuminfo/${searchQuery}`;
          axios.get(baseUrl).then((res) => {
            setAlbumInfo(res.data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Request error:", error.message);
          });
        }
      }, [searchQuery]);

  return (<>
    {albumInfo && <SongList title={name} list={songList} />}
    </>
  )
}

export default AlbumInfo;