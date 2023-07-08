import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MusicRecommendation from "./Components/recommendation";
import SearchResults from './Components/searchResults';

const MyRoutes = () => {
  return (
      <Routes>
        <Route path="/" Component={MusicRecommendation}/>
        <Route path="/search" element={<SearchResults />}/>
      </Routes>
  );
};

export default MyRoutes;
