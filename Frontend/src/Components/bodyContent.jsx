import MusicCard from "../Components/musicCard";
import "../styles/bodyContent.css";
import MyRoutes from '../Routes.js';

const BodyContent = () => {
  return (
    <div className="bodyContent">
        <MusicCard />
        <MyRoutes/>
    </div>
  );
};

export default BodyContent;
