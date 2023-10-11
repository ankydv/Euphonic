import React, { useEffect, useState } from 'react'
import SongList from './SongList'
import { useSelector } from 'react-redux';
import axios from 'axios';

const server = process.env.REACT_APP_AUTH_SERVER;

const History = () => {
  const currMusic = useSelector(state => state.music);
  const historyChange = useSelector(state => state.addHistoryResponse);
  const [history, setHistory] = useState([]);
    // const queue = useSelector((state) => state.queue);
    const config = {
        headers: {"auth-token" : localStorage.getItem('token')}
    }
    useEffect(() => {
      axios.get(`${server}api/songs/fetchhistory`, config)
        .then((res) => {
          // console.log(typeof(['ankit','dfnks']))
          setHistory(res.data) // Update the history state with res.data
        })
        .catch((error) => {
          console.error("Error fetching history:", error);
        }); 
    }, [historyChange]);
  return (
    <SongList title="History" isLoading={false} list={history} />
  )
}

export default History