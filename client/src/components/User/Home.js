import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spotify from "spotify-web-api-js";
import User from "./User";
import NewUserForm from "./NewUserForm";
import UserEvents from './UserEvents'
import styled from 'styled-components'

const ImageStyles = styled.img`
border-radius: 50%;
`

const ArtistImage = styled.img`
height: 200px;
width: 200px;
`

const SpotifyWebApi = new Spotify();

class Home extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      users: [],
      userTop: {
        items: [{
          images: [{}]
        }]
      },
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
    // this.getAllUsers();
    this.getToken()
    this.getTopArtists()
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

  getTopArtists = () => {
    let params = this.getHashParams()
    let accessToken = params.access_token;

    fetch("https://api.spotify.com/v1/me/top/artists", {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
          .then(response => response.json())
          .then(data => this.setState({ userTop: data }))
  }

 
  getToken = () => {
    let params = this.getHashParams();
    let accessToken = params.access_token;
    let token = "token";
    localStorage.setItem(token, params.access_token);
  };

  // THIS IS FOR DATABASE STORED USERS
  // getAllUsers = async () => {
  //   const res = await axios.get("/api/users");
  //   console.log(res.data);
  //   this.setState({ users: res.data });
  // }

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
            ? 'http://localhost:8888/login' 
            : 'https://cg-final-backend.herokuapp.com/login'
          }}>Login with Spotify</button>
        {/* </a> */}
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
                  <div><Link to={`users/${this.state.user.id}`}>Hello, {this.state.user.display_name.split(' ')[0]}!</Link></div>
              ) : (
              <Link to={`users/${this.state.user.id}`}><div>Go to user</div></Link>)}
              {this.state.user.product === 'premium' ? (`You are a ${this.state.user.product} user!`): (`You are an ${this.state.user.product} user!`) }
            </div>
          </div>
        </div>
         {this.state.loggedIn ? (
           <div>
           {this.state.userTop.items.map(artist => (
             <div>
               
               <div><ArtistImage src={artist.images[0].url} /></div>
               <div>{artist.name}</div>
             </div>
           ))}
         </div>
         ) : null}       
        
        <div>
          {this.state.loggedIn ? (<UserEvents />) : null}
        </div>
      </div>
    );
  }
}

export default Home;
