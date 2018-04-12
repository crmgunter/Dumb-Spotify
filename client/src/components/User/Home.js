import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spotify from "spotify-web-api-js";
import User from "./User";
import NewUserForm from "./NewUserForm";

const SpotifyWebApi = new Spotify();

class Home extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      users: [],
      form: false
    };
    if (params.access_token) {
      SpotifyWebApi.setAccessToken(params.access_token);
    }
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers = async () => {
    const res = await axios.get("/api/users");
    console.log(res.data);
    this.setState({ users: res.data });
  };

  toggleForm = () => {
    this.setState({ form: !this.state.form });
  };

  render() {
    return (
      <div>
          <a href="http://localhost:8888"><button>Login with Spotify</button></a>
        <button onClick={this.toggleForm}>Create New User</button>
        {this.state.form ? (
          <NewUserForm getAllUsers={this.getAllUsers} />
        ) : null}
        {this.state.users.map(user => (
          <div key={user._id}>
            <Link to={`users/${user._id}`}>{user.username}</Link>
            {user.location}
            <img src={user.image} alt="user image" />
          </div>
        ))}
      </div>
    );
  }
}

export default Home;
