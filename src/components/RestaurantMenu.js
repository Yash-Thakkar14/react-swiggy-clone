import React from "react";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import starIcon from "../../assets/star-6-24.jpg";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";

const RestaurantMenu = () => {
  const [restaurantInfo, setRestaurantInfo] = useState(null);

  const { resId } = useParams();
  console.log(resId);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(
      MENU_API + resId + "&catalog_qa=undefined&submitAction=ENTER"
    );
    const json = await data.json();
    setRestaurantInfo(json?.data);
  };

  console.log(restaurantInfo);

  return restaurantInfo === null ? (
    <Shimmer />
  ) : (
    <div className="menu-container">
      <div className="menu">
        <div className="breadcrum">
          Home / Banglore / {restaurantInfo?.cards[2]?.card?.card?.info?.name}
        </div>
        <h1>{restaurantInfo?.cards[2]?.card?.card?.info?.name}</h1>
        <div className="info-card">
          <div className="rating-cost">
            <div>
              <img src={starIcon} className="rating-icon" alt="rating-icon" />
            </div>
            <div>
              {" "}
              {restaurantInfo?.cards[2]?.card?.card?.info?.avgRating +
                "(" +
                restaurantInfo?.cards[2]?.card?.card?.info?.totalRatingsString +
                ")"}
            </div>
            <div className="seperator">•</div>
            <div>
              {restaurantInfo?.cards[2]?.card?.card?.info?.costForTwoMessage}
            </div>
          </div>
          <div className="cuisines">
            {restaurantInfo?.cards[2]?.card?.card?.info?.cuisines.join(", ")}
          </div>
          <div className="place">
            <div className="dot-line">
              <div className="dot"></div>
              <div className="line"></div>
              <div className="dot"></div>
            </div>
            <div className="place-name">
              <p className="outlet">
                Outlet
                <span className="outlet-text">
                  {restaurantInfo?.cards[2]?.card?.card?.info?.locality}
                </span>
              </p>
              <p className="text">
                {restaurantInfo?.cards[2]?.card?.card?.info?.availability
                  ?.opened ? (
                  "Open"
                ) : (
                  <span>
                    {
                      restaurantInfo?.cards[2]?.card?.card?.info
                        ?.orderabilityCommunication?.subTitle?.text
                    }
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="deals-container">
        <h2>Deals for you</h2>
        <div className="deals">
          {restaurantInfo?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers?.map(
            (item, index) => {
              return (
                <div className="deals-card" key={index}>
                  <div className="deals-card-img">
                    <img
                      className="deals-img"
                      src={
                        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/" +
                        item?.info?.offerLogo
                      }
                    />
                  </div>
                  <div className="deals-card-text">
                    <p className="card-text1">{item?.info?.header}</p>
                    <p className="card-text2">{item?.info?.couponCode}</p>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
      <div className="menu-section-header">MENU</div>
      {restaurantInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]
        ?.card?.card?.title == "Top Picks" && (
        <div className="top-picks-container">
          <h2 className="top-pick-header">Top Picks</h2>
          <div className="top-picks">
            {restaurantInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.carousel.map(
              (item) => {
                return (
                  <div className="top-pick-card" key={item?.bannerId}>
                    <img
                      className="top=pick-img"
                      src={
                        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/" +
                        item?.creativeId
                      }
                    />
                    <div className="top-pick-text">
                      <div className="top-pick-text1">
                        {item?.dish?.info?.price
                          ? item?.dish?.info?.price
                          : item?.dish?.info?.variantsV2?.pricingModels[0]
                              ?.price / 100}
                      </div>
                      <div></div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}
      <div className="seperator"></div>
      <div className="menu-sections">
        {console.log(
          restaurantInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
