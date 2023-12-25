import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MusicRecommendation from "./Components/recommendation";
import SearchResults from './Components/searchResults';
import Login from './Components/login';
import Signup from './Components/Signup';
import History from './Components/History';
import ArtistInfo from './Components/ArtistInfo';
import AlbumInfo from './Components/AlbumInfo';

const MyRoutes = () => {
  return (
      <Routes>
        <Route path="/" Component={MusicRecommendation}/>
        <Route path="/search" element={<SearchResults />}/>
        <Route path='/login' Component={Login} />
        <Route path='/signup' Component={Signup} />
        <Route path='/history' Component={History} />
        <Route path='/artist' Component={ArtistInfo} />
        <Route path='/album' Component={AlbumInfo} />
      </Routes>
  );
};

export default MyRoutes;
