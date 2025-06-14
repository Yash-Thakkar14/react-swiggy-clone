import React from "react";
import { render, screen } from "@testing-library/react";
import RestaurantCard from "../RestaurantCard";
import "@testing-library/jest-dom";
import mockData from "../mocks/resCardMock.json";

it("should render RestaurantCard component with props", () => {
  render(<RestaurantCard resData={mockData} />);

  const name = screen.getByText("Pizza Hut");

  expect(name).toBeInTheDocument();
});
