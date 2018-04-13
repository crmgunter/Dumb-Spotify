import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditUserForm from "./EditUserForm";
import Spotify from 'spotify-web-api-js'
import UserPlaylists from "./UserPlaylists";

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
          images: [{}]
      }
    };
    if (params) {
      SpotifyWebApi.setAccessToken(params);
      console.log(params);
    }
  }

  componentDidMount() {
    this.getUser();
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

  getUser = async () => {
    const userId = this.props.match.params.userId;
    const res = await axios.get(`/api/users/${userId}`);
    console.log(res.data);
    this.setState({ user: res.data });
  };

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
      <div>
        <h1>hey from single user</h1>
        {this.state.user.username}
        {this.state.user.location}
        <img src={this.state.user.image} alt="user image" />
        <button onClick={this.toggleForm}>Edit User</button>
        {this.state.form ? (
          <EditUserForm user={this.state.user} getUser={this.getUser} />
        ) : null}
        <button onClick={this.toggleRemove}>Delete User</button>
        {this.state.delete ? (
          <div>
            <p>Are you sure you want to delete?</p>
            <button onClick={this.remove}>Yes</button>
            <button onClick={this.toggleRemove}>No</button>
          </div>
        ) : null}

        {this.state.user.playlists.map(playlist => (
          <div key={playlist._id}>
            <Link
              to={`/users/${this.state.user._id}/playlists/${playlist._id}`}
            >
              {playlist.name}
            </Link>
            {playlist.description}
          </div>
        ))}
        <div>
            {this.state.spotifyUser.display_name}
            <img src={this.state.spotifyUser.images[0].url}/>
        </div>
        <UserPlaylists
        getSpotifyUser={this.getSpotifyUser}/>
      </div>
    );
  }
}

export default User;
