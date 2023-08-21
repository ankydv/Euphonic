import MusicCard from "../Components/musicCard";
import "../styles/bodyContent.css";
import MyRoutes from '../Routes.js';
import { useSelector } from "react-redux";
import Queue from "./queue";

const BodyContent = () => {
  
  const currMusic = useSelector(state => state.music);
  const bodyClass = `${currMusic?"bodyContent":"inactive-bodyContent"}`;
  return (
    <div className={bodyClass}>
        {currMusic && <MusicCard />}
        <MyRoutes/>
        {currMusic && <Queue/>}
    </div>
  );
};

export default BodyContent;
