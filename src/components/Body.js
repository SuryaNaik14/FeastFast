import ResCards from "./ResCards";
import { useState, useEffect } from "react";
import resObjList from "./utils/mockData";
import Shimmer from "./utils/Shimmer";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState();
  const [filterRestorent, setFilterRestorent] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    console.log("is useEffect");
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.96340&lng=77.58550&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log("----->>>" +json?.data?.cards[4]?.card.card.gridElements.infoWithStyle.restaurants);
    
    setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);

    setFilterRestorent(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
 
  };

  if (listOfRestaurants === 0) {
    return <Shimmer />;
  }
  const handleFilterClick = () => {
    const filteredList = listOfRestaurants.filter(
      (res) => res.info.avgRating < 4
    );
    setListOfRestaurants(filteredList);
    console.log(filteredList);
  };

  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            onClick={() => {
              // filter the card and update UI
              //searchText
              console.log(searchText);
              var filterdeResult = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilterRestorent(filterdeResult);
            }}
          >
            Search
          </button>
        </div>
        <button className="filter-btn" onClick={handleFilterClick}>
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {filterRestorent.map((restaurant) => (
          <ResCards key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
