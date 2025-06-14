import React from "react";
import { render, screen } from "@testing-library/react";
import RestaurantMenu from "../RestaurantMenu";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import mockData from "../mocks/mockResListData.json";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => Promise.resolve(moc),
  });
});

it("should render RestaurantMenu component", async () => {
  await act(async () => render(<RestaurantMenu />));

  const name = screen.getByText("Restaurant Menu");

  expect(name).toBeInTheDocument();
});
