import React, { Component } from "react";
import { Link } from "react-router-dom";
import NewPlaylistForm from "../Playlist/NewPlaylistForm";

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
          </div>
        ))}
      </div>
    );
  }
}

export default UserPlaylists;
