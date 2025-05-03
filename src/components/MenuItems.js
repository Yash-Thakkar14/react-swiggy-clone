import React from "react";

const MenuItems = (props) => {
  const { itemCards } = props;
  return (
    <div>
      {itemCards && itemCards.length > 0 ? (
        itemCards.map((item) => {
          return (
            <>
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
                </div>
                <div className="dish-photo">
                  <img
                    className="dish-img"
                    src={
                      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                      item?.card?.info?.imageId
                    }
                  />
                  <button className="add-btn">ADD</button>
                  <p className="custom-text">Customisable</p>
                </div>
              </div>
              <hr></hr>
            </>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default MenuItems;
