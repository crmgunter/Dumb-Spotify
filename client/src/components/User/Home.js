import React, { Component } from "react";
import { Link } from "react-router-dom";
import Spotify from "spotify-web-api-js";
import UserEvents from "./UserEvents";
import ArtistView from "../Artists/ArtistView";
import styled from "styled-components";

const ImageStyles = styled.img`
  border-radius: 50%;
`;

const ArtistImage = styled.img`
  height: 200px;
  width: 200px;
`;

const SpotifyWebApi = new Spotify();

class Home extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      users: [],
      userTop: {
        items: [
          {
            images: [{}],
            name: ""
          }
        ]
      },
      address: {
        results: [{
          formatted_address: ''
        }]
      },
      data: {
        results: [{

        }]
      },
      user: {
        images: [{}],
        followers: {}
      },
      form: false,
      toggleEvents: ""
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
    this.getSpotifyUser();
    this.getToken();
    this.getTopArtists();
    this.getLocation();
  }

  getLocation = () => {
    fetch(
      `https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAIQjITgrmru0jXfT-CESNqvTvxhA6UmZ8
    `,
      {
        method: "POST"
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({ location: data });
        let lat = this.state.location.location.lat;
        let long = this.state.location.location.lng;
        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyAIQjITgrmru0jXfT-CESNqvTvxhA6UmZ8`
        )
          .then(response => response.json())
          .then(data => {
            console.log(data);
            this.setState({ address: data });
          });
      });
  };

  getSpotifyUser = event => {
    if (this.state.loggedIn) {
      let params = this.getHashParams();
      let accessToken = params.access_token;

      fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
        .then(response => response.json())
        .then(data => this.setState({ user: data }));
    }
  };

  getTopArtists = () => {
    let params = this.getHashParams();
    let accessToken = params.access_token;

    fetch("https://api.spotify.com/v1/me/top/artists", {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
      .then(response => response.json())
      .then(data => this.setState({ userTop: data }));
  };

  getToken = () => {
    let params = this.getHashParams();
    let token = "token";
    localStorage.setItem(token, params.access_token);
  };

  toggleForm = () => {
    this.setState({ form: !this.state.form });
  };

  toggleEvents = id => {
    console.log(id);
    const artist = id;
    this.setState({ toggleEvents: id });
  };

  render() {
    return (
      <div>
        <button
          onClick={() => {
            window.location = window.location.href.includes("localhost")
              ? "http://localhost:8888/login"
              : "https://cg-final-backend.herokuapp.com/login";
          }}
        >
          Login with Spotify
        </button>

        <div>
          <div>
            {/* <img src={this.state.user.images[0].url} alt="user"/> */}
            {this.state.user.images[0] ? (
              <ImageStyles src={this.state.user.images[0].url} />
            ) : null}
            <div>
              {this.state.user.display_name ? (
                <div>
                  <Link to={`users/${this.state.user.id}`}>
                    Hello, {this.state.user.display_name.split(" ")[0]}!
                  </Link>
                </div>
              ) : (
                <Link to={`users/${this.state.user.id}`}>
                  <div>Go to user</div>
                </Link>
              )}
              {this.state.user.product === "premium"
                ? `You are a ${this.state.user.product} user!`
                : `You are an ${this.state.user.product} user!`}
            </div>
            <div>It looks like you're at {this.state.address.results[0].formatted_address}</div>
          </div>
        </div>
        {this.state.loggedIn ? (
          <div>
            {this.state.userTop.items.map(artist => (
              <div>
                <div>
                  <ArtistImage src={artist.images[0].url} />
                </div>
                <div
                  onClick={() => {
                    this.toggleEvents(artist.id);
                  }}
                >
                  {artist.name}
                </div>
                {this.state.toggleEvents === artist.id ? (
                  <ArtistView
                    artistName={artist.name}
                    toggleEvents={this.state.toggleEvents}
                  />
                ) : null}
              </div>
            ))}
          </div>
        ) : null}

        <div>
          {this.state.loggedIn ? (
            <UserEvents
              getHashParams={this.getHashParams}
              userTop={this.state.userTop.items.map(item => item.name)}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Home;
