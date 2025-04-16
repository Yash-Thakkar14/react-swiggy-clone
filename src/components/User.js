import React from "react";
import { useState } from "react";

const User = (props) => {
  const [count, setCount] = useState(1);
  const [count2, setCount2] = useState(2);

  return (
    <div className="user-card">
      <h1>Count {count}</h1>
      <h1>Count {count2}</h1>
      <h2>Name: {props?.name}</h2>
      <h3>Location: </h3>
      <h4>Contact: @</h4>
    </div>
  );
};
export default User;
