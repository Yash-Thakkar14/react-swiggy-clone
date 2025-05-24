import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const navigate = useNavigate(); // Initializing the hook

  return cartItems.length == 0 ? (
    <div className="empty-cart-wrapper">
      <div className="empty-cart-img"></div>
      <div className="empty-cart-text1">Your cart is empty</div>
      <div className="empty-cart-text2">
        You can go to home page to view more restaurants
      </div>
      <div className="empty-cart-btn" onClick={() => navigate("/")}>
        See Restaurants Near You
      </div>
    </div>
  ) : (
    <div>Cart</div>
  );
};

export default Cart;
