import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spotify from "spotify-web-api-js";
import User from "./User";
import NewUserForm from "./NewUserForm";
import styled from 'styled-components'

const ImageStyles = styled.img`
border-radius: 50%;
`

const SpotifyWebApi = new Spotify();

class Home extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      users: [],
      user: {
        images: [{}],
        followers: {}
      },
      form: false
    };
    if (params.access_token) {
      SpotifyWebApi.setAccessToken(params.access_token);
      console.log(params.access_token);
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
    this.getSpotifyUser()
    this.getAllUsers();
    this.getToken()
  }


  getSpotifyUser = (event) => {
    if (this.state.loggedIn) {
        let params = this.getHashParams();
        let accessToken = params.access_token;
  
        fetch("https://api.spotify.com/v1/me", {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
          .then(response => response.json())
          .then(data => this.setState({ user: data }))
          .then(data => console.log(this.state.user.display_name))
      }
  }

 
  getToken = () => {
    let params = this.getHashParams();
    let accessToken = params.access_token;
    let token = "token";
    localStorage.setItem(token, params.access_token);
  };

  getAllUsers = async () => {
    const res = await axios.get("/api/users");
    console.log(res.data);
    this.setState({ users: res.data });
  }

  toggleForm = () => {
    this.setState({ form: !this.state.form });
  };

  render() {
    return (
      <div>
        {/* ;lkjsdlfkj */}
        {/* <a href="http://localhost:8888"> */}
          <button onClick={() => {
            window.location = window.location.href.includes('localhost') 
            ? 'http://localhost:8888' 
            : 'https://cgfinalproject.herokuapp.com'
          }}>Login with Spotify</button>
        {/* </a> */}
  <p>WORK!!!</p>
        {/* THIS IS FOR USERS STORED IN THE DATA BASE */}

        {/* <button onClick={this.toggleForm}>Create New User</button>
        {this.state.form ? (
          <NewUserForm
            getAllUsers={this.getAllUsers}
            user={this.state.user}
            // token={this.params.access_token}
          />
        ) : null}
        {this.state.users.map(user => (
          <div key={user._id}>
            <Link to={`users/${user._id}`}>{user.username}</Link>
            {user.location}
            <img src={user.image} alt="user image" />
          </div>
        ))} */}

        <div>
          <div>
            {/* <img src={this.state.user.images[0].url} alt="user"/> */}
            {this.state.user.images[0] ? (<ImageStyles src={this.state.user.images[0].url} />) : null}
            <div>
              {this.state.user.display_name ? (
                  <div><Link to={`users/${this.state.user.id}`}>{this.state.user.display_name}</Link></div>
              ) : (
              <div>Go to user</div>)}
              {this.state.user.country}
              {this.state.user.email}
              {this.state.user.followers.total}
              {this.state.user.product}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
