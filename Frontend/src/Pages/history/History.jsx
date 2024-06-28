import React, { useEffect, useState } from 'react'
import SongList from "../../Components/songList/SongList"
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Box, Button, Typography } from '@mui/material';

const server = process.env.REACT_APP_AUTH_SERVER;

const History = () => {
  const currMusic = useSelector(state => state.music);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isloadMorePossible, setisLoadMorePossible] = useState(true);
  const [lastDate, setLastDate] = useState();
    const config = {
        headers: {"auth-token" : localStorage.getItem('token')}
    }
    useEffect(() => {
      setIsLoading(true);
      loadHistory();
    }, []);

    const loadHistory = () => {
      setIsLoadingMore(true);
      axios.get(`${server}api/songs/fetchhistory?page=${page}${history.length!==0 ? '&lastDate='+lastDate: ''}`, config)
        .then((res) => {
          setHistory([...history, ...res.data.data]) // Update the history state with res.data
          setIsLoading(false);
          setIsLoadingMore(false);
          setPage(prev => prev+1);
          setisLoadMorePossible(parseInt(res.data.currentPage)+1 < res.data.totalPages);
          if(!lastDate)
            setLastDate(res.data.data[res.data.data.length - 1].date);
        })
        .catch((error) => {
          console.error("Error fetching history:", error);
        }); 
    }

    const handleClick = () => {
      loadHistory();
    }
  return (
    <Box>
      <SongList title="History" isLoading={isLoading} list={history} />
      {isloadMorePossible ?
        <Button type='outline' onClick={handleClick} disabled={isLoadingMore}>Load more</Button>
        :
        <Typography>You're all caught Up</Typography>
      }
      </Box>
  )
}

export default History