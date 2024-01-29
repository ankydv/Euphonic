import React, { useEffect, useRef, useState } from 'react'
import "../styles/video.css";
import { useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";
import { CgMiniPlayer } from "react-icons/cg";
import { BsArrowsFullscreen } from "react-icons/bs";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
import { useLocation } from 'react-router-dom';
import QualityToggle, { QualityLabel } from './MaterialUI Components/VideoQuality';

const Video = () => {
    const musicInfo = useSelector((state) => state.musicInfo);
    const isVideoPictureInPicure = useSelector((state) => state.isVideoPictureInPicure);
    const [qualities, setQualities] = useState();
    const [currFormat, setCurrFormat] = useState();
    const videoRef = useRef(null);

    const dispatch = useDispatch();
    const {sendVideoRef, sendisVideoPictureInPicure} = bindActionCreators(actionCreators, dispatch);
    const audioRef = useSelector((state) => state.audioRef);
    const isSeeking = useRef(false);
    const videoHide = isVideoPictureInPicure ? "hide" : "";
    const location = useLocation();
    const [isWaiting, setIsWaitiing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isOutOfFocus, setIsOutOfFocus] = useState(false);
    const [isQualityModalOpened, setIsQualityModalOpened] = useState(false);
    
    const parendDiv = document.querySelector('.routes');
    if (parendDiv) {
      parendDiv.scrollTop = 0;
    }

    function getSortedVideoAdaptiveFormats(musicInfo) {
        if (!musicInfo || !musicInfo.streamingData || !musicInfo.streamingData.adaptiveFormats) {
          return [];
        }
      
        const videoFormats = musicInfo.streamingData.adaptiveFormats.filter((format) =>
          format.mimeType.startsWith('video/webm')
        );
      
        // Sort the array based on the 'height' property
        const sortedVideoFormats = videoFormats.sort((a, b) => {
          const heightA = a.height || 0;
          const heightB = b.height || 0;
      
          return heightA - heightB;
        });
        return sortedVideoFormats;
      }

      useEffect(() => {
        const handleFocus = async () => {
          if (isSeeking.current || document.pictureInPictureElement) {
            // Avoid seeking multiple times if it's already in progress
            return;
          }
          // Seek the video to the current audio position
          if (audioRef.current && videoRef.current && isOutOfFocus===true) {
            isSeeking.current = true;
    
            const targetTime = audioRef.current.currentTime;

            // Seek video to the dynamically updated audio current time
            videoRef.current.currentTime = targetTime;
    
            // Wait for the video to be buffered to the dynamically updated audio's time
            
            isSeeking.current = false;
            setIsOutOfFocus(false);

          }
        };
        window.addEventListener('focus', handleFocus);
        return () => {
          window.removeEventListener('focus', handleFocus);
        }
      },[videoRef,isOutOfFocus])
      const handleWaiting = () => {
        audioRef.current.pause();
        setIsWaitiing(true);
       };
       const handlePlaying = (ref) => {
         ref.current.play();
         setIsWaitiing(false);
       };
    useEffect(() => {
        setQualities(getSortedVideoAdaptiveFormats(musicInfo));
    }, [musicInfo])

    useEffect(() => {
      if (qualities && qualities.length > 0) {
        // Get the target height (either from localStorage or default value)
        const targetQualityLabel = localStorage.getItem('defaultVideoQuality') || "720p";
        
        // Find the first object with a height less than or equal to the target height
        const maxResolution = qualities.find(obj => obj.qualityLabel === targetQualityLabel) || qualities[qualities.length - 1];
    
        // Set the current format to the found object, or null if not found
        setCurrFormat(maxResolution);
      }
    }, [qualities]);
    

    useEffect(() => {
      sendVideoRef(videoRef);
    },[videoRef])

    function handleEnterPiP() {
      sendisVideoPictureInPicure(true);
    }
    
    function handleLeavePiP() {
      sendisVideoPictureInPicure(false);
    }
    useEffect(() => {
      if(!document.pictureInPictureElement)
      videoRef.current && videoRef.current.requestPictureInPicture()
    },[location])
    const handleReady = () => {
      setIsLoading(false);
        videoRef.current.addEventListener('waiting', handleWaiting);
        videoRef.current.addEventListener('playing', () => handlePlaying(audioRef));
        if (audioRef.current && audioRef.current.readyState === 4) {
          if(audioRef.current.currentTime!==videoRef.current.currentTime)
          videoRef.current.currentTime=audioRef.current.currentTime;
          videoRef.current.play();
          audioRef.current.play();
        }
        
      videoRef.current.addEventListener('enterpictureinpicture', handleEnterPiP);
      videoRef.current.addEventListener('leavepictureinpicture', handleLeavePiP);
      return () => {
        // Clean up event listeners when the component is unmounted
          videoRef.current.removeEventListener('waiting', handleWaiting);
          videoRef.current.removeEventListener('playing', handlePlaying);
          videoRef.current.removeEventListener('enterpictureinpicture', handleEnterPiP);
          videoRef.current.removeEventListener('leavepictureinpicture', handleLeavePiP);
      };
    }

    const handleTogglePiP = async () => {
      try {
        if (document.pictureInPictureElement) {
          // If already in PiP mode, exit
          await document.exitPictureInPicture();
        } else {
          // Request PiP mode
          await videoRef.current.requestPictureInPicture();
        }
      } catch (error) {
        console.error('Error toggling PiP mode:', error);
      }
    };

    const handlePause = () => {
      if (isVideoPictureInPicure || document.fullscreenElement!=null)
        audioRef.current.pause()
      else if(document.visibilityState === "hidden"){
        setIsOutOfFocus(true);
      }
    }
    const handleFullscreen = () => {
      const videoElement = videoRef.current;
  
      if (videoElement) {
        if (videoElement.requestFullscreen) {
          videoElement.requestFullscreen();
        } else if (videoElement.mozRequestFullScreen) {
          videoElement.mozRequestFullScreen();
        } else if (videoElement.webkitRequestFullscreen) {
          videoElement.webkitRequestFullscreen();
        } else if (videoElement.msRequestFullscreen) {
          videoElement.msRequestFullscreen();
        }
      }
    };

    const handleSeek = ()=>{
      audioRef.current.currentTime = videoRef.current.currentTime;
    }

    const handleEnd = () => {
      audioRef.current.play();
    }

    const handleLoadStart = () => {
      setIsLoading(true);
    };
  
  return (
    currFormat && 
    <div className={`video ${videoHide}`}>
      <div className='video__controls'>
        <RxCross2 color='red' size={30} onClick={handleTogglePiP} />
        <CgMiniPlayer size={27} onClick={handleTogglePiP} />
        <BsArrowsFullscreen size={20} onClick={handleFullscreen} />
        <div className='quality'>
          <QualityLabel isQualityModalOpened={isQualityModalOpened} setIsQualityModalOpened={setIsQualityModalOpened} qualityLabel={currFormat.qualityLabel} />
          {isQualityModalOpened && <div className='quality__toggle__container'>
            <QualityToggle qualities={qualities} currQuality={currFormat} setCurrQuality={setCurrFormat} setIsQualityModalOpened={setIsQualityModalOpened} />
          </div>}
        </div>
      </div>
        {
          <div className={`video__wrapper ${isLoading?"isLoading":""}`} style={isLoading?{aspectRatio:currFormat.width/currFormat.height}:{}}>
            <video onLoadStart={handleLoadStart} onEnded={handleEnd} id='videoElement' onSeeked={handleSeek} onPause={handlePause} onLoadedMetadata={handleReady} ref={videoRef} src={currFormat.url}></video>
            {(isWaiting || isLoading) && 
            <div className="loader__wrapper">
              <Backdrop
                sx={{ color: '#fff',}}
                open={true}
              >
              <CircularProgress className='loader' color='secondary' />
              </Backdrop>
           </div>
            }
          </div>
        }
    </div>
  )
}

export default Video