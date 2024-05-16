import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MusicRecommendation from "./Components/home/recommendation";
import SearchResults from './Components/search/searchResults';
import History from './Components/history/History';
import ArtistInfo from './Components/artist/ArtistInfo';
import AlbumInfo from './Components/album/AlbumInfo';
import ForgotPassword from './Components/auth/ForgotPassword';
import Liked from './Components/liked/Liked';
import Test from './Components/common/Test';
import PlayListInfo from './Components/playlist/PlayListInfo';
import SignIn from './Components/auth/SignIn';
import SignUp from './Components/auth/Signup';

const MyRoutes = () => {
  return (
      <Routes>
        <Route path="/" Component={MusicRecommendation}/>
        <Route path="/search" Component={SearchResults}/>
        <Route path='/login' Component={SignIn} />
        <Route path='/signin' Component={SignIn} />
        <Route path='/signup' Component={SignUp} />
        <Route path='/history' Component={History} />
        <Route path='/artist' Component={ArtistInfo} />
        <Route path='/album' Component={AlbumInfo} />
        <Route path='/playlist' Component={PlayListInfo} />
        <Route path='/resetpassword' Component={ForgotPassword} />
        <Route path='/liked' Component={Liked} />
        <Route path='/test' Component={Test} />
      </Routes>
  );
};

export default MyRoutes;
