import MusicCard from "../Components/musicCard";
import "../styles/bodyContent.css";
import MyRoutes from '../Routes.js';
import { useSelector } from "react-redux";

const BodyContent = () => {

  const currMusic = useSelector(state => state.music);

  return (
    <div className={currMusic ? "bodyContent" : "bodycontent fullBody"}>
        {currMusic && <MusicCard />}
        <MyRoutes/>
    </div>
  );
};

export default BodyContent;
