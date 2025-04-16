import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: "Dummy",
        location: "Dummy",
      },
      count: 0,
    };
    console.log(this.props.name + "Child Constructor");
  }

  async componentDidMount() {
    console.log(this.props.name + "Child ComponentDidMount");
    // It is used to make API calls or set up subscriptions

    const data = await fetch(
      "https://mocki.io/v1/ee94d819-67db-4465-a4cb-05e82efced05"
    );
    const json = await data.json();

    this.setState({
      userInfo: json,
    });
    console.log(json);
  }

  render() {
    const { name, location, username } = this.state.userInfo; // destructuring props
    console.log(this.props.name + "Child Render");
    return (
      <div className="user-card">
        <h1>Count {this.state.count}</h1>
        <button
          onClick={() => {
            // how to update state in class component
            this.setState({
              count: this.state.count + 1,
            });
          }}
        >
          Count Increase
        </button>
        <h2>Name: {name}</h2>
        <h3>Location: {location} </h3>
        <h4>Username: {username}</h4>
      </div>
    );
  }
}

export default UserClass;
