import { MusicCards } from "./recommendation";
import "../styles/musicRecommendation.css";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { sample_searchResult } from "./helpers/sample";

const server = process.env.REACT_APP_SERVER;

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  var searchHeading;
  var searchQuery = searchParams.get("q");
  if (searchQuery === null || searchQuery === "")
    searchHeading = "Search Results will appear below";
  else {
    searchHeading = `Search Results for "${searchQuery}"`;
  }

  const rearrangeResponse = (res) =>{
    return res.reduce((acc, item) => {
      var { category, ...rest } = item;
      if (category === "Profiles")
        //Don't add Profiles Category
        return acc;
      if (category == null) {
        const temp = item.resultType;
        category = temp.charAt(0).toUpperCase() + temp.slice(1) + "s";
      }
      const existingIndex = acc.findIndex(
        (group) => group.category === category
      );

      if (existingIndex !== -1) {
        acc[existingIndex].data.push(rest);
      } else {
        acc.push({ category, data: [rest] });
      }

      return acc;
    }, [])
  }
  const [searchResponse, setSearchResponse] = useState(rearrangeResponse(sample_searchResult));
  
  useEffect(() => {
    if (searchQuery != null) {
      setIsLoading(true);
      const baseUrl = `${server}api/search/${searchQuery}`;
      axios.get(baseUrl).then((res) => {
        setSearchResponse(
          rearrangeResponse(res.data)
        );
        setIsLoading(false);
      });
    }
  }, [searchQuery]);

  return (
    <div className="music-recommendation">
      <h2>{searchHeading}</h2>
      {searchResponse != null &&
        searchResponse.map((category, index) => (
          <MusicCards
            key={index}
            title={category.category}
            dataSet={category.data}
            isLoading={isLoading}
          />
        ))}
    </div>
  );
};

export default SearchResults;