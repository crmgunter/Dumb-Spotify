import React, { Component } from "react";
import { Link } from "react-router-dom";
import NewPlaylistForm from "../Playlist/NewPlaylistForm";
import styled from "styled-components";

const ImageStyles = styled.img`
  border-radius: 50%;
`;

const ImageSize = styled.img`
  width: 200px;
  height: 200px;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
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

const ArtistContainer = styled.div`
  border: 1px solid #e14658;
  margin: 10px 5px;
  padding: 20px;
  border-radius: 5px;
  max-width: 220px;
  min-width: 220px;
`;

class UserPlaylists extends Component {
  state = {
    playlists: {
      items: [
        {
          images: [
            {
              url: ""
            }
          ],
          owner: {
            id: ""
          }
        }
      ]
    },
    newForm: false,
    confirmUnfollow: false
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

  unfollowPlaylist = id => {
    const userId = this.props.userId;
    console.log(userId);
    const playlistId = id;
    console.log(playlistId);
    const token = localStorage.getItem("token");
    console.log(token);
    fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/followers`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    this.getPlaylists();
  };

  toggleForm = () => {
    this.setState({ newForm: !this.state.newForm });
  };

  areYouSure = () => {
    this.setState({ confirmUnfollow: !this.state.confirmUnfollow });
  };

  render() {
    return (
      <div>
        <ButtonStyle onClick={this.toggleForm}>New Playlist</ButtonStyle>
        {this.state.newForm ? (
          <NewPlaylistForm
            userId={this.props.userId}
            getPlaylists={this.getPlaylists}
          />
        ) : null}

        <FlexContainer>
          {this.state.playlists.items.map((playlist) => (
            playlist.owner.id === this.props.userId ? (<div>
              <div>
              {console.log(playlist.owner.id === this.props.userId ? (console.log(true)) : (console.log(false, playlist.name)))}
              <ArtistContainer>
                <div>
                  {playlist.images[0] ? (
                    <ImageSize src={playlist.images[0].url} />
                  ) : null}
                </div>
                <Link
                  to={`/users/${this.props.userId}/playlists/${playlist.id}`}
                >
                  {playlist.name}
                </Link>
                <div>
                  <ButtonStyle onClick={this.areYouSure}>Unfollow</ButtonStyle>
                  {this.state.confirmUnfollow ? (
                    <div>
                      <ButtonStyle
                        onClick={() => {
                          this.unfollowPlaylist(playlist.id);
                        }}
                      >
                        Yes
                      </ButtonStyle>
                      <ButtonStyle onClick={this.areYouSure}>No</ButtonStyle>
                    </div>
                  ) : null}
                </div>
              </ArtistContainer>
            </div>
            </div>) : null
   ))}
        </FlexContainer>
      </div>
    );
  }
}

export default UserPlaylists;
