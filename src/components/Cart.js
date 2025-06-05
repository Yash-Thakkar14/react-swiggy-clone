import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MenuItems from "./MenuItems";
import { useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice"; // Import the action to clear the cart

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const navigate = useNavigate(); // Initializing the hook
  const dispatch = useDispatch(); // Import useDispatch from react-redux

  // try not to acces the store like this
  // const store = useSelector((store)=>store); // This is not recommended, use useSelector instead

  const handleClearCart = () => {
    // Dispatch an action to clear the cart
    dispatch(clearCart());
  };

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
    <div className="cart-wrapper">
      <h1 className="cart-header">Cart</h1>
      <button className="cart-clr-btn" onClick={handleClearCart}>
        Clear Cart
      </button>
      <div className="cart-items-wrapper">
        <MenuItems itemCards={cartItems} isCartPage={true} />
      </div>
    </div>
  );
};

export default Cart;
