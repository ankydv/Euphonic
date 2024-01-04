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
import MiniDrawer from "./MiniSideBar.jsx";
import { Box } from "@mui/material";

const BodyContent = () => {
  const currMusic = useSelector((state) => state.music);
  const bodyClass = `bodyContent ${currMusic ? "" : "noMusic"}`;

  const navigate = useNavigate();
  const location = useLocation();
  const isNotHome = location.pathname !== "/";
  return (
    <Box sx={{ display: 'flex' }}>
    <MiniDrawer />
    {/* <Box component="main" sx={{  p: 3 }}> */}
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
              onClick={() => navigate(-1)}
            ></BsFillArrowLeftCircleFill>

            <BsFillArrowRightCircleFill
              className="button"
              size={30}
              color="#f52a99"
              onClick={() => navigate(1)}
            ></BsFillArrowRightCircleFill>
          </div>
        )}
        <MyRoutes />
      </div>
      <div>
      {currMusic && <Queue />}
      </div>
    </div>
    {/* </Box> */}
    </Box>
  );
};

export default BodyContent;
