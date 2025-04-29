import React, { useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SWIGGY_API } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  // local State variable
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filteredListOfRestaurant, setFilteredListOfRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const onlineStatus = useOnlineStatus(); // Custom Hook

  // Normal JS variable
  //   let listOfRestaurant2 = [
  //     {
  //       info: {
  //         id: "489129",
  //         name: "Chinese Wok",
  //         cloudinaryImageId: "e0839ff574213e6f35b3899ebf1fc597",
  //         locality: "Anand Nagar",
  //         areaName: "Marathahalli",
  //         costForTwo: "₹250 for two",
  //         cuisines: ["Chinese", "Asian", "Tibetan", "Desserts"],
  //         avgRating: 3.8,
  //         sla: {
  //           deliveryTime: 33,
  //         },
  //       },
  //     },
  //     {
  //       info: {
  //         id: "489130",
  //         name: "KFC",
  //         cloudinaryImageId: "e0839ff574213e6f35b3899ebf1fc597",
  //         locality: "Anand Nagar",
  //         areaName: "Marathahalli",
  //         costForTwo: "₹250 for two",
  //         cuisines: ["Chinese", "Asian", "Tibetan", "Desserts"],
  //         avgRating: 4.2,
  //         sla: {
  //           deliveryTime: 33,
  //         },
  //       },
  //     },
  //     {
  //       info: {
  //         id: "489131",
  //         name: "MCD",
  //         cloudinaryImageId: "e0839ff574213e6f35b3899ebf1fc597",
  //         locality: "Anand Nagar",
  //         areaName: "Marathahalli",
  //         costForTwo: "₹250 for two",
  //         cuisines: ["Chinese", "Asian", "Tibetan", "Desserts"],
  //         avgRating: 4.4,
  //         sla: {
  //           deliveryTime: 33,
  //         },
  //       },
  //     },
  //   ];

  useEffect(() => {
    fetchData();
  }, []);

  // resList API call to swiggy live endpoint
  const fetchData = async () => {
    const data = await fetch(SWIGGY_API);
    const json = await data.json();
    console.log(json);
    setListOfRestaurant(
      // Optional Chaining
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  //Conditional Rendering
  //   if (listOfRestaurant.length == 0) {
  //     return <Shimmer />; // Add loading component following shimmer UI;
  //   }

  const handleSearch = (val) => {
    if (val) {
      const filteredList = listOfRestaurant.filter((res) =>
        res?.info?.name.trim().toLowerCase().includes(val.trim().toLowerCase())
      );
      setFilteredListOfRestaurant(filteredList);
    }
  };

  if (onlineStatus == false) {
    return (
      <h1>
        Looks like you are offline. Please check your internet connection.
      </h1>
    );
  }

  return listOfRestaurant.length == 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <div className="search-container">
            <input
              type="text"
              className="search-box"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                handleSearch(e.target.value);
              }}
              placeholder="Search for Restaurant"
            />
            {searchText && (
              <span
                className="clear-icon"
                onClick={() => {
                  setSearchText("");
                  setFilteredListOfRestaurant([]);
                }}
              >
                &#x2715; {/* Unicode for a cross icon */}
              </span>
            )}
          </div>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurant.filter(
              (res) => res?.info?.avgRating > 4
            );
            setListOfRestaurant(filteredList);
          }}
        >
          Top Rated Restaurant
        </button>
      </div>
      <div className="res-container">
        {(searchText.length == 0
          ? listOfRestaurant
          : filteredListOfRestaurant
        ).map((restaurant) => (
          <Link
            to={"/restaurants/" + restaurant?.info?.id}
            key={restaurant?.info?.id}
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
