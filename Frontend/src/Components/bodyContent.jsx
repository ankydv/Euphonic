import MusicCard from "../Components/musicCard";
import "../styles/bodyContent.css";
import MyRoutes from "../Routes.js";
import { useSelector } from "react-redux";
import Queue from "./queue";

import { useLocation, useNavigate } from "react-router-dom";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

const BodyContent = () => {
  const currMusic = useSelector((state) => state.music);
  const bodyClass = `bodyContent ${currMusic ? "" : "noMusic"}`;

  const history = useNavigate();
  const location = useLocation();
  const isNotHome = location.pathname !== "/";
  return (
    <div className={bodyClass}>
      <div>
      {currMusic && <MusicCard />}
      </div>
      <div className="routes">
        {isNotHome && (
          <div className="navigation">
            <BsFillArrowLeftCircleFill
              className="button"
              size={30}
              color="#f52a99"
              onClick={() => history(-1)}
            ></BsFillArrowLeftCircleFill>

            <BsFillArrowRightCircleFill
              className="button"
              size={30}
              color="#f52a99"
              onClick={() => history(1)}
            ></BsFillArrowRightCircleFill>
          </div>
        )}
        <MyRoutes />
      </div>
      <div>
      {currMusic && <Queue />}
      </div>
    </div>
  );
};

export default BodyContent;
