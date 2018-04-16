import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Song from "../Song";
import Search from "./Search";
import EditPlaylistForm from "./EditPlaylistForm";

class Playlist extends Component {
  state = {
    editForm: false,
    tracks: {
      items: [
        {
          track: {
            name: ""
          }
        }
      ]
    },
    playlist: {
      uri: ""
    }
  };

  componentDidMount() {
    this.getPlaylist();
    this.getTracks();
  }

  // getPlaylists = async () => {
  //     const userId = this.props.match.params.userId
  //     const playlistId = this.props.match.params.playlistId

  //     const res = await axios.get(`/api/users/${userId}/playlists/${playlistId}`)
  //     console.log(res.data)
  //     this.setState({ playlist: res.data })
  // }

  getPlaylist = () => {
    const token = localStorage.getItem("token");
    const userId = this.props.match.params.userId;
    const playlistId = this.props.match.params.playlistId;

    fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
      .then(response => response.json())
      .then(data => this.setState({ playlist: data }));
  };

  getTracks = () => {
    const token = localStorage.getItem("token");
    const userId = this.props.match.params.userId;
    const playlistId = this.props.match.params.playlistId;

    fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
      .then(response => response.json())
      .then(data => this.setState({ tracks: data }))
      .catch(err => {
        console.log(err);
      });
  };


  //THIS SHIT DOES NOT WORK GOD DAMN IT
//   removeTrackFromPlayList = trackUri => {
//     const token = localStorage.getItem("token");
//     const userId = this.props.match.params.userId;
//     const playlistId = this.props.match.params.playlistId;
//     const url = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks/${params}`;
//     const uri = trackUri;
//     console.log(uri);
//     const params = `?uris=${uri}`;

//     fetch(url, {
//       mehtod: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//       "Content-Type": "application/json",
//     fuck: {"tracks": [{"uri": uri, "positions": [0]}]}
//     })
//   };

  toggleForm = () => {
    this.setState({ editForm: !this.state.editForm });
  };

  render() {
    return (
      <div>
        <h1>Playlist</h1>
        <div>
          <iframe
            src={`https://open.spotify.com/embed?uri=${
              this.state.playlist.uri
            }`}
            width="300"
            height="380"
            frameborder="0"
            allowtransparency="true"
            allow="encrypted-media"
          />
        </div>

        <div>
          <h1>{this.state.playlist.name}</h1>
        </div>
        <button onClick={this.toggleForm}>Edit</button>
        {this.state.editForm ? (
          <EditPlaylistForm
            userId={this.props.match.params.userId}
            playlistId={this.props.match.params.playlistId}
            getPlaylist={this.getPlaylist}
          />
        ) : null}

        <div>
          {/* IMPORTANT!!!
         IF USER PLAYLIST WAS NOT MADE BY THE USER SIGNED IN, IT WILL ERROR OUT! */}
          {this.state.tracks.items.map(track => (
            <div>
              <Link
                to={`/users/${this.props.match.params.userId}/playlists/${
                  this.props.match.params.playlistId
                }/songs/${track.track.id}`}
              >
                {track.track.name}
              </Link>
              <p
                onClick={() => {
                  this.removeTrackFromPlayList(track.track.uri);
                }}
              >
                X
              </p>
            </div>
          ))}
        </div>
        <div>
          <Search
            userId={this.props.match.params.userId}
            playlistId={this.props.match.params.playlistId}
            getTracks={this.getTracks}
          />
        </div>
      </div>
    );
  }
}

export default Playlist;
