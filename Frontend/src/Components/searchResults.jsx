import { MusicCards } from "./recommendation";
import '../styles/musicRecommendation.css';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

const SearchResults = () =>{
    const [searchParams,] = useSearchParams();
    // const [searchedSongs, setSearchedSongs] = useState(null);
    // const [searchedAlbums, setSearchedAlbums] = useState(null);
    // const [searchedArtists, setSearchedArtists] = useState(null);
    // const [searchedPlaylists, setSearchedPlaylists] = useState(null);
    const [searchResponse, setSearchResponse] = useState(null);

    const server = process.env.REACT_APP_SERVER;

    var searchHeading
    var searchQuery = searchParams.get('q');
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
                setSearchResponse(res.data);
            })
        }
    }, [searchQuery, server]);
    if (searchResponse) {
        var searchResults = searchResponse.reduce((acc, item) => {
          const { category, ...rest } = item;
          const existingIndex = acc.findIndex((group) => group.category === category);
      
          if (existingIndex !== -1) {
            acc[existingIndex].data.push(rest);
          } else {
            acc.push({ category, data: [rest] });
          }
      
          return acc;
        }, []);
      }
      

    useEffect(() => {
        console.log(searchResults);
    }, [searchResults])

    // useEffect(() => {
    //     if(searchQuery!=null){
    //         const baseUrl = `${server}api/search/${searchQuery}?type=`;
    //         console.log(baseUrl)
    //         let type = "songs";
    //         axios.get(baseUrl+type)
    //         .then((songs) => {
    //             setSearchedSongs(songs.data);
    //         })

    //         type = "albums";
    //         axios.get(baseUrl+type)
    //         .then((albums) => {
    //             setSearchedAlbums(albums.data);
    //         })

    //         type = "artists";
    //         axios.get(baseUrl+type)
    //         .then((artists) => {
    //             setSearchedArtists(artists.data);
    //         })

    //         type = "playlists";
    //         axios.get(baseUrl+type)
    //         .then((playlists) => {
    //             setSearchedPlaylists(playlists.data);
    //         })
    //     }
    // }, [searchQuery]);

    return(
        <div className="music-recommendation">
            <h2>{searchHeading}</h2>
            {/* {searchedSongs!=null && <MusicCards title = "Songs" dataSet={searchedSongs} />}
            {searchedAlbums!=null && <MusicCards title = "Albums" dataSet={searchedAlbums} />}
            {searchedArtists!=null && <MusicCards title = "Artists" dataSet={searchedArtists} type="artists" />}
            {searchedPlaylists!=null && <MusicCards title = "Playlists" dataSet={searchedPlaylists} type="playlists" />} */}

            {searchResults != null && searchResults.map((category, index) => (
                <MusicCards title={category.category} dataSet={category.data} />
            ))}
        </div>
    )
}

export default SearchResults;