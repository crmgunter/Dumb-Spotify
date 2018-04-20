import React, { Component } from "react";
import styled from 'styled-components'

const ImageStyle = styled.img`
height: 200px;
width: 200px;
`
const ResultFlex = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-around;
`

const TrackContainer = styled.div`
height: 400px;
width: 200px;
`

class SearchResults extends Component {
    state = {
        tracks: [{}]
    }


//THIS NEEDS TO BE CLEANED UP AND ALSO
//NEEDS TO UPDATE IN REAL TIME
// FUCKING PLEASE

  addTrackToPlaylist = async (trackUri) => {
    const token = localStorage.getItem("token");
    const uri = trackUri
    const params = `?uris=${uri}`
    fetch(
      `https://api.spotify.com/v1/users/${this.props.userId}/playlists/${
        this.props.playlistId
      }/tracks/${params}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json"
      }
    )
    //   .then(res => res.json())
    //   .catch(err => console.log(err))
    //   .then(data => this.setState({ tracks: data }))
    //   .then(this.props.getTracks())
  };


  render() {
    return (
      <ResultFlex>
        {this.props.results.tracks.items.map(track => (
          <TrackContainer>
            <ImageStyle src={track.album.images[0].url} alt=""/>
            <div>{track.name}</div>
            <div>{track.artists[0].name}</div>
            <div>{track.album.name}</div>
            {this.props.toggleButton ? <button onClick={() => this.addTrackToPlaylist(track.uri)}>Add to playlist</button> : null}
          </TrackContainer>
        ))}
      </ResultFlex>
    );
  }
}

export default SearchResults;
