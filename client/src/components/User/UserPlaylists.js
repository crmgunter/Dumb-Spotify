import React, { Component } from "react";
import { Link } from "react-router-dom";
import NewPlaylistForm from "../Playlist/NewPlaylistForm";
import axios from 'axios'

class UserPlaylists extends Component {
  state = {
    playlists: {
      items: [{}]
    },
    newForm: false
  };

  componentDidMount() {
    this.getPlaylists();
  }

  getPlaylists = () => {
    const token = localStorage.getItem("token");
    fetch("https://api.spotify.com/v1/me/playlists", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(data => this.setState({ playlists: data }));
  };

  unfollowPlaylist = (id) => {
    const userId = this.props.userId
    console.log(userId)
    const playlistId = id
    console.log(playlistId)
    const token = localStorage.getItem("token");
    fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/followers`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
    this.getPlaylists()
}

  toggleForm = () => {
    this.setState({ newForm: !this.state.newForm })
  }

  render() {
    return (
      <div>
        <h1>playlists:</h1>
        <button onClick={this.toggleForm}>New Playlist</button>
        {this.state.newForm? (<NewPlaylistForm 
       userId={this.props.userId}
       getPlaylists={this.getPlaylists}/>) : null}
        {this.state.playlists.items.map(playlist => (
          <div>
            <Link to={`/users/${this.props.userId}/playlists/${playlist.id}`}>
              {playlist.name}
            </Link>
            <p onClick={() => {this.unfollowPlaylist(playlist.id)}}>X</p>
          </div>
        ))}
      </div>
    );
  }
}

export default UserPlaylists;
