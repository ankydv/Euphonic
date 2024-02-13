import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import SongList from './SongList';
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";

const AlbumInfo = () => {
    const server = process.env.REACT_APP_SERVER;
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    var searchQuery = searchParams.get("q");
    const [albumInfo, setAlbumInfo] = useState();

    const name = albumInfo ? albumInfo.title : "Loading";
    const songList = albumInfo ? albumInfo.tracks : [];
    const dispatch = useDispatch();
    const { sendMusic, sendQueue } = bindActionCreators(
      actionCreators,
      dispatch
    );
    const queue = useSelector((state) => state.queue)
    const handlePlay = (song) => {
      const temp = {...song, shouldNotLoadQueue: true} 
      sendMusic(temp);
      if(songList!==queue)
        sendQueue(songList);
    }
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
    <SongList title={name} list={songList} isLoading={isLoading} handleSongClick={handlePlay} />
    </>
  )
}

export default AlbumInfo;