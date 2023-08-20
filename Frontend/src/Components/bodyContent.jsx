import MusicCard from "../Components/musicCard";
import "../styles/bodyContent.css";
import MyRoutes from '../Routes.js';
import { useSelector } from "react-redux";
import Queue from "./queue";

const BodyContent = () => {
  const sampleSongs = [
    {
      title: 'Song 1',
      artist: 'Artist 1',
    },
    {
      title: 'Song 2',
      artist: 'Artist 2',
    },
    {
      title: 'Song 3',
      artist: 'Artist 3',
    },
    {
      title: 'Song 4',
      artist: 'Artist 4',
    },
  ];
  
  const currMusic = useSelector(state => state.music);

  return (
    <div className="bodyContent">
        {currMusic && <MusicCard />}
        <MyRoutes/>
        {currMusic && <Queue upNextSongs={sampleSongs} />}
    </div>
  );
};

export default BodyContent;
