import React, { useEffect, useState } from 'react'
import SongList from './SongList'
import { useSelector } from 'react-redux';
import axios from 'axios';

const server = process.env.REACT_APP_AUTH_SERVER;

const Liked = () => {
  const currMusic = useSelector(state => state.music);
  const historyChange = useSelector(state => state.addHistoryResponse);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
    const config = {
        headers: {"auth-token" : localStorage.getItem('token')}
    }
    useEffect(() => {
      setIsLoading(true);
      axios.get(`${server}api/songs/fetchliked`, config)
        .then((res) => {
          setHistory(res.data) // Update the history state with res.data
        })
        .catch((error) => {
          console.error("Error fetching favourite songs:", error);
        }); 
        setIsLoading(false);
    }, [historyChange]);
  return (
    <SongList title="Liked Songs" isLoading={isLoading} list={history} />
  )
}

export default Liked