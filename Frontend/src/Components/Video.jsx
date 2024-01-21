import React, { useEffect, useState } from 'react'
import "../styles/video.css";
import { useSelector } from 'react-redux';

const Video = () => {
    const musicInfo = useSelector((state) => state.musicInfo);
    const [qualities, setQualities] = useState();
    const [currFormat, setCurrFormat] = useState();
    
    const parendDiv = document.querySelector('.routes');
    if (parendDiv) {
      parendDiv.scrollTop = 0;
    }

    function getSortedVideoAdaptiveFormats(musicInfo) {
        if (!musicInfo || !musicInfo.streamingData || !musicInfo.streamingData.adaptiveFormats) {
          return [];
        }
      
        const videoFormats = musicInfo.streamingData.adaptiveFormats.filter((format) =>
          format.mimeType.startsWith('video')
        );
      
        // Sort the array based on the 'height' property
        const sortedVideoFormats = videoFormats.sort((a, b) => {
          const heightA = a.height || 0;
          const heightB = b.height || 0;
      
          return heightA - heightB;
        });
        console.log(sortedVideoFormats)
        return sortedVideoFormats;
      }

    useEffect(() => {
        setQualities(getSortedVideoAdaptiveFormats(musicInfo));
    }, [musicInfo])

    useEffect(() => {
        setCurrFormat(qualities && qualities.find(obj => obj.height == 720 || obj.height == 480))
    })
  return (
    currFormat && 
    <div className='video'>
        {<video  autoPlay src={currFormat.url}></video>}
    </div>
  )
}

export default Video