import React, { Component } from "react";
import { Link } from "react-router-dom";
import Spotify from "spotify-web-api-js";
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
    let token = "token";
    localStorage.setItem(token, params.access_token);
  };

  toggleForm = () => {
    this.setState({ form: !this.state.form });
  };

  render() {
    return (
      <div>
          <button onClick={() => {
            window.location = window.location.href.includes('localhost') 
            ? 'http://localhost:8888/login' 
            : 'https://cg-final-backend.herokuapp.com/login'
          }}>Login with Spotify</button>

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
          {this.state.loggedIn ? (
          <UserEvents
          getHashParams={this.getHashParams}
          userTop={this.state.userTop}/>) : null}
        </div>
      </div>
    );
  }
}

export default Home;
