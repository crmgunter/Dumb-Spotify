import React, { Component } from "react";
import axios from "axios";
import Spotify from 'spotify-web-api-js'
import UserPlaylists from "./UserPlaylists";
import styled from 'styled-components'

const Body = styled.div`
min-height: 100vh;
`

const ImageStyles = styled.img`
  border-radius: 50%;
  margin: 20px;
`;

const SpotifyWebApi = new Spotify()

class User extends Component {
  constructor() {
    super();
    const params = localStorage.getItem('token')
    this.state = {
      loggedIn: params ? true : false,
      user: {
        playlists: [],
        form: false
      },
      delete: false,
      spotifyUser: {
          images: [{}],
          followers: {
            total: ''
          }
      }
    };
    if (params) {
      SpotifyWebApi.setAccessToken(params);
      console.log(params);
    }
  }

  componentDidMount() {
    // this.getUser();
    this.getSpotifyUser()
  }

  getSpotifyUser = () => {
      const token = localStorage.getItem('token')
      console.log(token)
      fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => response.json())
        .then(data => this.setState({ spotifyUser: data }))
        .then(data => console.log(this.state.spotifyUser.display_name));
  }

  toggleForm = () => {
    this.setState({ form: !this.state.form });
  };

  toggleRemove = () => {
    this.setState({ delete: !this.state.delete });
  };

  remove = async () => {
    const userId = this.props.match.params.userId;
    await axios.delete(`/api/users/${userId}`);
    this.props.history.push(`/`);
  };

  render() {
    return (
      <Body>
        <div>
          <div>
            {this.state.spotifyUser.images[0] ? (<div><ImageStyles src={this.state.spotifyUser.images[0].url} alt={this.state.spotifyUser.display_name}/></div>) : null}
            {this.state.spotifyUser.display_name ? (<div>{this.state.spotifyUser.display_name}</div>) : null }
            <div>{this.state.spotifyUser.country}</div>
            <div><p>Followers: {this.state.spotifyUser.followers.total}</p></div>
            </div>
        </div>
        <UserPlaylists
        userId={this.state.spotifyUser.id}/>
      </Body>
    );
  }
}

export default User;
