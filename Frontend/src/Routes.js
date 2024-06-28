import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MusicRecommendation from "./Pages/home/recommendation";
import SearchResults from './Pages/search/searchResults';
import History from './Pages/history/History';
import ArtistInfo from './Pages/artist/ArtistInfo';
import AlbumInfo from './Pages/AlbumInfo/AlbumInfo';
import ForgotPassword from './Components/auth/ForgotPassword';
import Liked from './Pages/liked/Liked';
// import Test from './Components/songList/Test';
import PlayListInfo from './Pages/playlist/PlayListInfo';
import SignIn from './Components/auth/SignIn';
import SignUp from './Components/auth/Signup';
import CustomCheckout from './Pages/razorpay/CustomCheckout';

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
        <Route path='/pay' Component={CustomCheckout} />
        {/* <Route path='/test' Component={Test} /> */}
      </Routes>
  );
};

export default MyRoutes;
