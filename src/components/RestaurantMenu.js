import React from "react";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import Shimmer from "./Shimmer";
import starIcon from "../../assets/star-6-24.jpg";
import { useParams } from "react-router-dom";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import MenuItems from "./MenuItems";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const restaurantInfo = useRestaurantMenu(resId);
  const [expandedAccordion, setExpandedAccordion] = useState(false);
  const [expandedInnerAccordion, setExpandedInnerAccordion] = useState(false);

  const handleAccordionChange = (index) => {
    setExpandedAccordion((prev) => (prev === index ? null : index));
  };
  const handleInnerAccordionChange = (index) => {
    setExpandedInnerAccordion((prev) => (prev === index ? null : index));
  };

  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    //Dispatch an action
    dispatch(addItem(item));
    //item?.title
  };

  //Make this below code into a custom hook
  // const [restaurantInfo, setRestaurantInfo] = useState(null);
  // useEffect(() => {
  //   fetchMenu();
  // }, []);
  // const fetchMenu = async () => {
  //   const data = await fetch(
  //     MENU_API + resId + "&catalog_qa=undefined&submitAction=ENTER"
  //   );
  //   const json = await data.json();
  //   setRestaurantInfo(json?.data);
  // };

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
      <div className="menu-section-header">MENU 🍔</div>
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
                          ? item?.dish?.info?.price / 100
                          : item?.dish?.info?.variantsV2?.pricingModels[0]
                              ?.price / 100}
                      </div>
                      <button
                        data-testid="add-btn"
                        className="add-btn"
                        onClick={() => handleAddItem(item)}
                      >
                        ADD
                      </button>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}
      <div className="menu-sections">
        {restaurantInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
          ?.slice(2, -2)
          ?.map((section, index) => (
            <div key={index}>
              <div className="seperator"></div>
              <Accordion
                key={index}
                expanded={expandedAccordion === index}
                onChange={() => handleAccordionChange(index)}
                className="no-border-accordion"
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>
                    {section.card?.card?.title}
                    {section?.card?.card?.itemCards
                      ? " (" + section?.card?.card?.itemCards.length + ")"
                      : " (" + section.card?.card?.categories?.length + ")"}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {section.card?.card?.itemCards ? (
                    <MenuItems itemCards={section.card?.card?.itemCards} />
                  ) : (
                    section.card?.card?.categories.map(
                      (subsection, subindex) => (
                        <Accordion
                          key={subindex}
                          expanded={expandedInnerAccordion === subindex}
                          onChange={() => handleInnerAccordionChange(subindex)}
                          className="no-border-accordion"
                        >
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{subsection?.title} </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <MenuItems itemCards={subsection?.itemCards} />
                          </AccordionDetails>
                        </Accordion>
                      )
                    )
                  )}
                  <MenuItems itemCards={section.card?.card?.itemCards} />
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
