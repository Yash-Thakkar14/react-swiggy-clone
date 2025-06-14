import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Body from "../Body";
import "@testing-library/jest-dom";
import mockData from "../mocks/mockResListData.json";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(mockData); // Mocking an empty array response
    },
  });
});

it("should search ba in text input", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    )
  );
  const searchField = screen.getByPlaceholderText("Search for Restaurant");
  const initialCards = screen.getAllByTestId("res-card");

  expect(initialCards.length).toBe(1);

  // Triggering on change event to write something in the search field
  fireEvent.change(searchField, {
    target: { value: "ba" },
  });
  // Assertion to check if the search on change then cards present will match filter results
  const resCards = screen.getAllByTestId("res-card");

  expect(resCards.length).toBe(1);
});
