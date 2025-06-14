import React, { useEffect, useState } from "react";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { SWIGGY_API } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";
import WifiOffIcon from "@mui/icons-material/WifiOff";

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

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  // resList API call to swiggy live endpoint
  const fetchData = async () => {
    const data = await fetch(SWIGGY_API);
    const json = await data.json();
    setListOfRestaurant(
      // Optional Chaining
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  // Helper to get the current list of displayed restaurants
  const getDisplayedRestaurants = () =>
    searchText.length === 0
      ? listOfRestaurant || []
      : filteredListOfRestaurant || [];

  useEffect(() => {
    // Remove 'visible' class from all cards before observing
    const allCards = document.querySelectorAll(".res-card");
    allCards.forEach((card) => card.classList.remove("visible"));

    // Create an Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible"); // Add the 'visible' class when in viewport
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the card is visible
    );

    // Observe all currently displayed restaurant cards
    const cards = document.querySelectorAll(".res-card");
    cards.forEach((card) => observer.observe(card));

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, [listOfRestaurant, filteredListOfRestaurant, searchText]);

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
      <>
        <div className="shimmer-blur">
          <Shimmer />
        </div>
        <div className="wifi-icon">
          <WifiOffIcon style={{ color: "rgb(255, 82, 0)", fontSize: "4rem" }} />
        </div>
      </>
    );
  }

  console.log("List of Restaurant 🍲: ", listOfRestaurant);

  return listOfRestaurant?.length == 0 ? (
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
      <div className="sec-header">Top restaurant chains in Bangalore</div>
      <div className="res-container" data-testid="res-card">
        {(searchText.length == 0
          ? listOfRestaurant || []
          : filteredListOfRestaurant || []
        ).map((restaurant) => (
          <Link
            to={"/restaurants/" + restaurant?.info?.id}
            key={restaurant?.info?.id}
          >
            {/** here make logiv to give different card if promoted {resPromoted ? (
              <RestaurantCardPromoted resData={restaurant} />) : ( )} */}
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
