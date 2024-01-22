import React, { useEffect, useRef, useState } from 'react'
import "../styles/video.css";
import { useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";

const Video = ({onClose}) => {
    const musicInfo = useSelector((state) => state.musicInfo);
    const [qualities, setQualities] = useState();
    const [currFormat, setCurrFormat] = useState();
    const videoRef = useRef(null);

    const dispatch = useDispatch();
    const {sendVideoRef} = bindActionCreators(actionCreators, dispatch);
    const audioRef = useSelector((state) => state.audioRef);
    
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

    useEffect(() => {
      sendVideoRef(videoRef);
    },[videoRef])
    useEffect(() => {
      console.log(audioRef.current.readyState)
    },[audioRef])

    const handleReady = () => {
      if(audioRef.current.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA && videoRef.current.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA){
        console.log('video ready')
        audioRef.current.play();
        videoRef.current.play();
      }
    }
  return (
    currFormat && 
    <div className='video'>
      <div className='video__controls'>
      <RxCross2 color='red' size={25} onClick={onClose} />
      </div>
        {<video controls  onLoadedMetadata={handleReady} ref={videoRef} src={currFormat.url}></video>}
    </div>
  )
}

export default Video