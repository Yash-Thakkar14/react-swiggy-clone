import React from "react";
import { CDN_LINK } from "../utils/constants";
import starIcon from "../../assets/star-6-24.jpg";

const RestaurantCard = (props) => {
  const { resData } = props; //other way to destructure
  const {
    name,
    cuisines,
    avgRating,
    cloudinaryImageId,
    aggregatedDiscountInfoV3,
    areaName,
    sla,
  } = resData?.info;
  return (
    <div className="res-card" style={{ backgroundColor: "#f0f0f0" }}>
      <div className="res-logo-wrapper">
        <div className="res-logo-wrapper3">
          <img
            className="res-logo"
            src={CDN_LINK + cloudinaryImageId}
            alt="res-logo"
          />
          {aggregatedDiscountInfoV3?.header && (
            <div className="res-logo-text">
              {`${aggregatedDiscountInfoV3.header} `}
              {aggregatedDiscountInfoV3?.subHeader}
            </div>
          )}
        </div>
      </div>
      <div className="res-logo-content">
        <div>{name}</div>
        <div>
          <img src={starIcon} className="rating-icon" alt="rating-icon" />
          {`${avgRating} • ${sla?.slaString}`}
        </div>
        <div>{cuisines.join(", ")}</div>
        <div>{areaName}</div>
      </div>
    </div>
  );
};

// Higher Order Component

// input - RestaurantCard ==> RestaurantCardPromoted

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <RestaurantCard {...props} />
        <span>Promoted</span>
      </div>
    );
  };
};

export default RestaurantCard;
