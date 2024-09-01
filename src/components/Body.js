import ResCards, { withPromotedLable } from "./ResCards";
import { useState, useEffect } from "react";
import Shimmer from "./utils/Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "./utils/useOnlineStatus";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);  // Initialize as an empty array
  const [filterRestorent, setFilterRestorent] = useState([]);
  const [searchText, setSearchText] = useState("");

  const RestaurantsCardPromoted = withPromotedLable(ResCards);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.96340&lng=77.58550&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();
      const restaurants = json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
      
      setListOfRestaurants(restaurants);
      setFilterRestorent(restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFilterClick = () => {
    const filteredList = listOfRestaurants.filter(
      (res) => res.info.avgRating >= 4
    );
    setFilterRestorent(filteredList);
  };

  const onlineStatus = useOnlineStatus();
  if (!onlineStatus) {
    return <h1>Looks like you're offline</h1>;
  }

  // Show shimmer while data is loading
  if (listOfRestaurants.length === 0) return <Shimmer />;

  return (
    <div className=" " data-testid="bodyidOne">
      <div className="flex ml-20">
        <div className=" m-4 p-2">
          <input
            type="text"
            className="w-72 mr-4 h-6 bg-zinc-100 border border-gray-400 rounded-lg p-4"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="bg-blue-500 w-24 border rounded-lg h-9"
            onClick={() => {
              const filteredResult = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilterRestorent(filteredResult);
            }}
          >
            Search
          </button>
        </div>
        <button
          data-testid="ratedIdBtn"
          className=" bg-indigo-300 w-48 mt-6 border rounded-lg h-9"
          onClick={handleFilterClick}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div data-testid='resCardBody' className="flex flex-wrap h-20 justify-center items-center">
        {filterRestorent.map((restaurant) => (
          <Link
            to={"/restaurants/" + restaurant.info.id}
            key={restaurant.info.id}
          >
            {restaurant.info.isOpen ? (
              <RestaurantsCardPromoted resData={restaurant} />
            ) : (
              <ResCards resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
