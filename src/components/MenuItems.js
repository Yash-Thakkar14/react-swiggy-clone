import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const MenuItems = (props) => {
  const { itemCards, isCartPage } = props;

  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    //Dispatch an action
    dispatch(addItem(item));
    //item?.card?.info?.name
  };

  return (
    <div>
      {itemCards && itemCards.length > 0 ? (
        itemCards.map((item) => {
          if (item?.type === "TopCarousel") {
            return (
              <div key={item?.dish?.info?.id} data-testid="menu-item">
                <div className="dish-card" key={item?.dish?.info?.id}>
                  <div className="description">
                    <div className="dish-name">{item?.dish?.info?.name}</div>
                    <div className="dish-price">
                      {item?.dish?.info?.price / 100}
                    </div>
                    <div>
                      {item?.dish?.info?.ratings &&
                        item?.dish?.info?.ratings?.aggregatedRating?.rating +
                          "(" +
                          item?.dish?.info?.ratings?.aggregatedRating
                            ?.ratingCountV2 +
                          ")"}
                    </div>
                    <div>{item?.dish?.info?.description}</div>
                  </div>{" "}
                  <div className="dish-photo">
                    <img
                      className="dish-img"
                      src={
                        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                        item?.dish?.info?.imageId
                      }
                    />
                    {!isCartPage && (
                      <button
                        className="add-btn"
                        data-testid="add-btn"
                        onClick={() => handleAddItem(item)}
                      >
                        ADD
                      </button>
                    )}
                    {!isCartPage && <p className="custom-text">Customisable</p>}
                  </div>
                </div>
                <hr></hr>
              </div>
            );
          }
          return (
            <div key={item?.card?.info?.id} data-testid="menu-item">
              <div className="dish-card" key={item?.card?.info?.id}>
                <div className="description">
                  <div className="dish-name">{item?.card?.info?.name}</div>
                  <div className="dish-price">
                    {item?.card?.info?.price / 100}
                  </div>
                  <div>
                    {item?.card?.info?.ratings?.aggregatedRating?.rating +
                      "(" +
                      item?.card?.info?.ratings?.aggregatedRating
                        ?.ratingCountV2 +
                      ")"}
                  </div>
                  <div>{item?.card?.info?.description}</div>
                </div>{" "}
                <div className="dish-photo">
                  <img
                    className="dish-img"
                    src={
                      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                      item?.card?.info?.imageId
                    }
                  />
                  {!isCartPage && (
                    <button
                      className="add-btn"
                      data-testid="add-btn"
                      onClick={() => handleAddItem(item)}
                    >
                      ADD
                    </button>
                  )}
                  {!isCartPage && <p className="custom-text">Customisable</p>}
                </div>
              </div>
              <hr></hr>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default MenuItems;
