// Custom Hook useRestaurantMenu
import React from "react";
import { useEffect, useState } from "react";

import { MENU_API } from "../utils/constants";

const useRestaurantMenu = (resId) => {
  const [resInfo, setRestaurantInfo] = useState(null);

  // fetchData
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

  return resInfo;
};

export default useRestaurantMenu;
