import React, { Component } from "react";
import { Link } from "react-router-dom";
import NewPlaylistForm from "../Playlist/NewPlaylistForm";
import axios from 'axios'
import styled from 'styled-components'

const ImageSize = styled.img`
width: 200px;
height: 200px;
`

const FlexContainer = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-around;
`

class UserPlaylists extends Component {
  state = {
    playlists: {
      items: [{
        images: [{
          url: ''
        }]
      }]
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
       <FlexContainer>
        {this.state.playlists.items.map(playlist => (
          <div>
            {/* IF A PICTURE EXISTS, THIS WILL PULL IN THE PICTURE */}
            <div>{playlist.images[0]? (<ImageSize src={playlist.images[0].url} />) : null}</div>
            <Link to={`/users/${this.props.userId}/playlists/${playlist.id}`}>
              {playlist.name}
            </Link>
            <p onClick={() => {this.unfollowPlaylist(playlist.id)}}>X</p>
          </div>
        ))}
        </FlexContainer>
      </div>
    );
  }
}

export default UserPlaylists;
