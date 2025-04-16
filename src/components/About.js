import React from "react";
import User from "./User";
import UserClass from "./UserClass";
import { Component } from "react";

class About extends Component {
  constructor(props) {
    super(props);

    console.log(" Parent Constructor");
  }

  componentDidMount() {
    console.log("Parent ComponentDidMount");
  }

  render() {
    console.log(" Parent Render");
    return (
      <div className="about">
        <h1>About Us</h1>
        <p>This is a food delivery app.</p>
        <UserClass name={"First "} location={"Kuwait"} />
      </div>
    );
  }
}

export default About;
