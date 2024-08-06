import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';

const server = process.env.REACT_APP_SERVER;

const Lyrics = ({ songTitle, artist, currentTime }) => {
  const [currentLine, setCurrentLine] = useState('');
  const [lyricsLines, setLyricsLines] = useState([]);

  useEffect(() => {
    const fetchLyrics = async () => {
        setLyricsLines([])
        setCurrentLine('')
      try {
        const response = await axios.get(`${server}api/lyrics`, { params: { song_title: `${songTitle} ${artist}` } });
        if (response.status === 200) {
          setLyricsLines(response.data.lyrics);
        } else {
          console.error('Failed to fetch lyrics');
        }
      } catch (error) {
        console.error('Error fetching lyrics:', error);
      }
    };

    fetchLyrics();
  }, [songTitle]);

  useEffect(() => {
    if(lyricsLines){
    const currentIndex = lyricsLines.findIndex(line => currentTime >= line.time && currentTime < (line.time + 2)); // Adjust time range as needed
    if (currentIndex !== -1 && lyricsLines[currentIndex].text !== currentLine) {
      setCurrentLine(lyricsLines[currentIndex].text);
    }
    }
  }, [currentTime, currentLine, lyricsLines]);

  return (
    <Box>{currentLine}</Box>
  );
};

export default Lyrics;
