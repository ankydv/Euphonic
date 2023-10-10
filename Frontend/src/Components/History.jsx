import React, { useEffect } from 'react'
import SongList from './SongList'
import { useSelector } from 'react-redux';
import axios from 'axios';

const server = process.env.REACT_APP_AUTH_SERVER;

const History = () => {
    const queue = useSelector((state) => state.queue);
    const header = {
        "auth-token" : localStorage.getItem('token')
    }
    useEffect(() => {
        axios.get(`${server}api/songs/fetchhistory`,configs={header: header})
    })
  return (
    <SongList title="History" isLoading={false} list={queue} />
  )
}

export default History