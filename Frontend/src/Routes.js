import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MusicRecommendation from "./Components/recommendation";
import SearchResults from './Components/searchResults';
import Login from './Components/login';
import Signup from './Components/Signup';

const MyRoutes = () => {
  return (
      <Routes>
        <Route path="/" Component={MusicRecommendation}/>
        <Route path="/search" element={<SearchResults />}/>
        <Route path='/login' Component={Login} />
        <Route path='/signup' Component={Signup} />
      </Routes>
  );
};

export default MyRoutes;
