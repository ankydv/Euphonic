import React, { useEffect, useRef, useState } from 'react'
import "../styles/video.css";
import { useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";
import { CgMiniPlayer } from "react-icons/cg";
import { BsArrowsFullscreen } from "react-icons/bs";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";

const Video = ({onClose}) => {
    const musicInfo = useSelector((state) => state.musicInfo);
    const [qualities, setQualities] = useState();
    const [currFormat, setCurrFormat] = useState();
    const videoRef = useRef(null);

    const dispatch = useDispatch();
    const {sendVideoRef, sendVideoToggles} = bindActionCreators(actionCreators, dispatch);
    const audioRef = useSelector((state) => state.audioRef);
    const isSeeking = useRef(false);

    
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
        return sortedVideoFormats;
      }

      useEffect(() => {
        const handleFocus = async () => {
          if (isSeeking.current) {
            // Avoid seeking multiple times if it's already in progress
            return;
          }

          // Seek the video to the current audio position
          if (audioRef.current && videoRef.current) {
            isSeeking.current = true;
    
            const targetTime = audioRef.current.currentTime;

            // Seek video to the dynamically updated audio current time
            videoRef.current.currentTime = targetTime;
    
            // Wait for the video to be buffered to the dynamically updated audio's time
            
            isSeeking.current = false;

          }
        };
        window.addEventListener('focus', handleFocus);
        return () => {
          window.removeEventListener('focus', handleFocus);
        }
      },[videoRef])

      const handleWaiting = () => {
        audioRef.current.pause();
       };
       const handlePlaying = (ref) => {
         ref.current.play();
       };
    useEffect(() => {
        setQualities(getSortedVideoAdaptiveFormats(musicInfo));
    }, [musicInfo])

    useEffect(() => {
      setCurrFormat(qualities && qualities.reduce((max, obj) => {
        // Check if the current object's height is less than or equal to 1080
        if (obj.height <= 1080) {
          // Compare the height with the current maximum
          return obj.height > max.height ? obj : max;
        }
        return max;
      }, { height: 0, resolution: '' }))
    },[qualities])

    useEffect(() => {
      sendVideoRef(videoRef);
    },[videoRef])

    function handleEnterPiP() {
      console.log('enter')
      
      sendVideoToggles({ isPictureInPicure: true });
    }
    
    function handleLeavePiP() {
      // Video exited Picture-in-Picture mode
      sendVideoToggles({ isPictureInPicure: false });
    }

    const handleReady = () => {
        videoRef.current.addEventListener('waiting', handleWaiting);
        videoRef.current.addEventListener('playing', () => handlePlaying(audioRef));
        if (audioRef.current && audioRef.current.readyState === 4) {
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
  return (
    currFormat && 
    <div className='video'>
      <div className='video__controls'>
      <RxCross2 color='red' size={30} onClick={onClose} />
      <CgMiniPlayer size={27} onClick={handleTogglePiP} />
      <BsArrowsFullscreen size={20} />
      </div>
        {<video id='videoElement' onLoadedMetadata={handleReady} ref={videoRef} src={currFormat.url}></video>}
    </div>
  )
}

export default Video