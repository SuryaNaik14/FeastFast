import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: "surya",
        location: "KA",
        avatar_url: "https://surya.com",
      },
    };

    console.log(props.name);
  }

  async componentDidMount() {
    const data = await fetch("");
    const json = await data.json();
    console.log(json.name);

    this.setState({
      userInfo: json,
    });
  }

  render() {
    const { name, location, avatar_url } = this.state.userInfo;
    return (
      <div>
        {/* <div className="user-card">
          <img src={avatar_url} />
          <h2>name: {name}</h2>
          <h3>Location:{location}</h3>
          <h4>suryanaik01@gmail.com</h4>
        </div> */}
      </div>
    );
  }
}
export default UserClass;
