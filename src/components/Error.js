import React from "react";
import { useRouteError } from "react-router-dom";
import ERROR_ICON_URL from "../../assets/error-image.jpg";

const Error = () => {
  const err = useRouteError();
  return (
    <div className="error">
      <img className="error-img" src={ERROR_ICON_URL} alt="error" />
      <h1>Oops!</h1>
      <h2>Something Went Wrong</h2>
      <h3>
        {err.status}:{err.statusText}
      </h3>
    </div>
  );
};

export default Error;
