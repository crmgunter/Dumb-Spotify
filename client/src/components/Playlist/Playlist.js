import React, { Component } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import EditPlaylistForm from "./EditPlaylistForm";
import styled from "styled-components";

const Body = styled.div`
  min-height: 100vh;
  margin: 20px;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const SongFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ImageSize = styled.img`
  height: 100px;
  width: 100px;
`;

const ArtistContainer = styled.div`
  border: 1px solid #e14658;
  margin: 10px 5px;
  padding: 20px;
  border-radius: 5px;
  max-width: 220px;
  min-width: 220px;
`;

const ButtonStyle = styled.button`
  min-width: 100px;
  margin-left: 10px;
  padding: 15px;
  background: none;
  color: #e14658;
  font-size: 13px;
  border-radius: 5px;
  border: #e14658 solid 1px;
  margin-top: 10px;

  :hover {
    background: #e14658;
    color: seashell;
    border: 1px solid seashell;
    cursor: pointer;
  }
`;

class Playlist extends Component {
  state = {
    editForm: false,
    tracks: {
      items: [
        {
          track: {
            name: "",
            album: {
              images: [{}]
            }
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

  removeTrackFromPlayList = (trackUri, index) => {
    const token = localStorage.getItem("token");
    const userId = this.props.match.params.userId;
    const playlistId = this.props.match.params.playlistId;
    const url = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
    const uri = `${trackUri}`;
    const position = index;
    console.log(uri, position);

    fetch(url, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
      "Content-Type": "application/json",
      body: JSON.stringify({ tracks: [{ uri: uri, positions: [position] }] })
    });
  };

  toggleForm = () => {
    this.setState({ editForm: !this.state.editForm });
  };

  render() {
    return (
      <Body>
        <FlexContainer>
          <div>
            <iframe
              src={`https://open.spotify.com/embed?uri=${
                this.state.playlist.uri
              }`}
              title="widget"
              width="300"
              height="380"
              frameborder="0"
              allowtransparency="true"
              allow="encrypted-media"
            />
          </div>

          <div>
            <h1>{this.state.playlist.name}</h1>
            <ButtonStyle onClick={this.toggleForm}>Edit</ButtonStyle>
            {this.state.editForm ? (
              <EditPlaylistForm
                userId={this.props.match.params.userId}
                playlistId={this.props.match.params.playlistId}
                getPlaylist={this.getPlaylist}
              />
            ) : null}
            <SongFlex>
              {this.state.tracks.items.map((track, index) => (
                <ArtistContainer>
                  <div>
                    <ImageSize src={track.track.album.images[0].url} />
                  </div>
                  <Link
                    to={`/users/${this.props.match.params.userId}/playlists/${
                      this.props.match.params.playlistId
                    }/songs/${track.track.id}`}
                  >
                    {track.track.name}
                    {console.log(index)}
                  </Link>
                  <div>
                    <ButtonStyle
                      onClick={() => {
                        this.removeTrackFromPlayList(track.track.uri, index);
                      }}
                    >
                      Remove Song
                    </ButtonStyle>
                  </div>
                </ArtistContainer>
              ))}
            </SongFlex>
          </div>
        </FlexContainer>
        <div>
          <Search
            userId={this.props.match.params.userId}
            playlistId={this.props.match.params.playlistId}
            getTracks={this.getTracks}
          />
        </div>
      </Body>
    );
  }
}

export default Playlist;
