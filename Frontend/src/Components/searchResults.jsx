import { MusicCards } from "./recommendation";
import '../styles/musicRecommendation.css';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

const server = process.env.REACT_APP_SERVER;

const SearchResults = () =>{
    const [searchParams,] = useSearchParams();
    // const [searchedSongs, setSearchedSongs] = useState(null);
    // const [searchedAlbums, setSearchedAlbums] = useState(null);
    // const [searchedArtists, setSearchedArtists] = useState(null);
    // const [searchedPlaylists, setSearchedPlaylists] = useState(null);
    // const [searchedFilters, setSearchedFilters] = useState(null);
    const [searchResponse, setSearchResponse] = useState(null);
    var searchHeading
    var searchQuery = searchParams.get('q');
    // var type = searchParams.get('type');
    if(searchQuery===null || searchQuery==='')
        searchHeading = "Search Results will appear below";
    else{
        searchHeading = `Search Results for "${searchQuery}"`;
    }

    useEffect(() => {
        if(searchQuery!=null){
            const baseUrl = `${server}api/search/${searchQuery}`;
            axios.get(baseUrl)
            .then((res) => {
                setSearchResponse(
                    res.data.reduce((acc, item) => {
                        var { category, ...rest } = item;
                        if(category === 'Profiles')  //Don't add Profiles Category
                          return acc
                      if(category == null){
                          const temp = item.resultType;
                          category = temp.charAt(0).toUpperCase() + temp.slice(1)+'s';
                      }
                        const existingIndex = acc.findIndex((group) => group.category === category);
                    
                        if (existingIndex !== -1) {
                          acc[existingIndex].data.push(rest);
                        } else {
                          acc.push({ category, data: [rest] });
                        }
                    
                        return acc;
                      }, []));
            })
        }
    }, [searchQuery]);

    return(
        <div className="music-recommendation routes">
            <h2>{searchHeading}</h2>
            {/* {searchedSongs!=null && <MusicCards title = "Songs" dataSet={searchedSongs} />}
            {searchedAlbums!=null && <MusicCards title = "Albums" dataSet={searchedAlbums} />}
            {searchedArtists!=null && <MusicCards title = "Artists" dataSet={searchedArtists} type="artists" />}
            {searchedPlaylists!=null && <MusicCards title = "Playlists" dataSet={searchedPlaylists} type="playlists" />} */}

            {searchResponse != null && searchResponse.map((category, index) => (
                <MusicCards key={index} title={category.category} dataSet={category.data} />
            ))}
        </div>
    )
}

export default SearchResults;