import React from "react";
import { render, screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

describe("Contact Us Page Test Case", () => {
  beforeAll(() => {
    // console.log("Before All");
    //helpful to execute anything at the start
  });

  beforeEach(() => {
    // console.log("Before Each");
    //helpful to execute anything before each test case or cleanup tasks
  });

  afterAll(() => {
    // console.log("After All");
    //helpful to execute anything at the end of all test cases
  });

  afterEach(() => {
    // console.log("After Each");
    //helpful to execute anything after each test case or cleanup tasks
  });

  it("Should load Contact Us Component", () => {
    render(<Contact />);

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
  });

  it("Should load button inside Contact Us Component", () => {
    render(<Contact />);

    const button = screen.getByText("Submit");

    expect(button).toBeInTheDocument();
  });

  it("Should load name inside Contact Us Component", () => {
    render(<Contact />);

    const inputName = screen.getByPlaceholderText("Your Name");

    expect(inputName).toBeInTheDocument();
  });

  it("Should load 2 input boxes inside Contact Us Component", () => {
    render(<Contact />);

    //Querying
    const inputBoxes = screen.getAllByRole("textbox");

    //Assertion
    expect(inputBoxes.length).toBe(2);
  });
});
