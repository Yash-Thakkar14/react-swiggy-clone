import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RestaurantMenu from "../RestaurantMenu";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import mockData from "../mocks/mockResMenu.json";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import Header from "../Header";
import Cart from "../Cart";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => Promise.resolve(mockData),
  });
});

it("should render RestaurantMenu component", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
          <RestaurantMenu />
          <Cart />
        </Provider>
      </BrowserRouter>
    )
  );

  const addBtns = screen.getAllByTestId("add-btn");

  expect(addBtns.length).toBe(6);

  // fire a click event on the add button
  fireEvent.click(addBtns[0]);

  expect(screen.getByText("Cart - (1)")).toBeInTheDocument();

  fireEvent.click(addBtns[1]);
  expect(screen.getByText("Cart - (2)")).toBeInTheDocument();

  expect(screen.getAllByTestId("menu-item").length).toBe(2);
});
