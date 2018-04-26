import React, { Component } from "react";
import { Link } from "react-router-dom";
import Spotify from "spotify-web-api-js";
import ArtistView from "../Artists/ArtistView";
import styled from "styled-components";
import LandingPage from "./LandingPage";

const ImageStyles = styled.img`
  border-radius: 50%;
`;

const ArtistImage = styled.img`
  height: 200px;
  width: 200px;
`;

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .fromRight {
    animation-duration: 2s;
  }
`;

const TopContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;

  .fadeInDownBig {
    animation-duration: 2s;
  }
`;

const UserInfo = styled.div`
  margin: 20px;
  max-width: 40vw;

 
`;

const ButtonFlex = styled.div`
  display: flex;
  flex-direction: column;

`;

const ButtonStyle = styled.button`
  min-width: 100px;
  margin: 10px;
  padding: 15px;
  background: none;
  color: #e14658;
  font-size: 13px;
  border-radius: 5px;
  border: #e14658 solid 1px;

  :hover {
    background: #e14658;
    color: seashell;
    border: 1px solid seashell;
    cursor: pointer;
  }
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
        results: [
          {
            formatted_address: ""
          }
        ]
      },
      data: {
        results: [{}]
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
        console.log(data);
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
        .then(data => {
          this.setState({ user: data });
          if (this.state.user.images[0] && this.state.user.display_name) {
            const payload = {
              username: this.state.user.display_name,
              location: this.state.user.country,
              image: this.state.user.images[0].url,
              id: this.state.user.id
            };
            console.log(payload);
            fetch(`/api/users`, {
              method: "POST",
              body: JSON.stringify(payload),
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": `application/json`
              }
            });
          } else {
            const payload = {
              username: this.state.user.email,
              location: this.state.user.country
            };
            fetch(`/api/users`, {
              method: "POST",
              body: JSON.stringify(payload),
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": `application/json`
              }
            });
          }
        });
    }
  };

  getTopArtists = () => {
    let params = this.getHashParams();
    let accessToken = params.access_token;

    fetch("https://api.spotify.com/v1/me/top/artists?limit=50", {
      headers: { Authorization: `Bearer ${accessToken}` },
      limit: 50
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
        {this.state.loggedIn ? (
          <div>
            <TopContent>
              <UserInfo>
                <div className="animated fadeInLeftBig">
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
                  <div>
                    It looks like you're at{" "}
                    {this.state.address.results[0].formatted_address}
                  </div>
                </div>
              </UserInfo>
              <ButtonFlex className="fadeInDownBig">
                <div>
                  <ButtonStyle>Playlists</ButtonStyle>
                </div>
                <div>
                  <ButtonStyle>Top Artists</ButtonStyle>
                </div>
                <div>
                  <ButtonStyle>Top Tracks</ButtonStyle>
                </div>
              </ButtonFlex>
            </TopContent>
            {this.state.loggedIn ? (
              <Flex>
                {this.state.userTop.items.map(artist => (
                  <div className="fromRight animated fadeInRightBig">
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
                        location={
                          this.state.address.results[0].formatted_address
                        }
                      />
                    ) : null}
                  </div>
                ))}
              </Flex>
            ) : null}
          </div>
        ) : (
          <div>
            <LandingPage />
          </div>
        )}
      </div>
    );
  }
}

export default Home;
