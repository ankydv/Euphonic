import { MusicCards } from "./recommendation";
import '../styles/musicRecommendation.css';
import { useSearchParams } from 'react-router-dom';

const SearchResults = () =>{
    const [searchParams, setSearchParams] = useSearchParams();
    var searchHeading
    if(searchParams.get('q')==null || searchParams.get('q')=='')
        searchHeading = "Search Results will appear below";
    else
        searchHeading = "Search Results for "+searchParams.get('q');
    return(
        <div className="music-recommendation">
            <h2>{searchHeading}</h2>
            <MusicCards title = "Songs"></MusicCards>
            <MusicCards title = "Albums"></MusicCards>
            <MusicCards title = "Artists"></MusicCards>
            <MusicCards title = "Playlists"></MusicCards>
        </div>
    )
}

export default SearchResults;