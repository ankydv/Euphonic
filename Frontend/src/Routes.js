import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MusicRecommendation from "./Components/recommendation";
import SearchResults from './Components/searchResults';
import History from './Components/History';
import ArtistInfo from './Components/ArtistInfo';
import AlbumInfo from './Components/AlbumInfo';
import ForgotPassword from './Components/ForgotPassword';
import Liked from './Components/Liked';
import Test from './Components/Test';
import PlayListInfo from './Components/PlayListInfo';
import SignIn from './Components/SignIn';
import SignUp from './Components/Signup';
import Payment from './Components/payment';

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
        <Route path='/payment' Component={Payment} />
      </Routes>
  );
};

export default MyRoutes;
