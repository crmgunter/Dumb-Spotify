import React, { Component } from 'react';
import axios from 'axios'

class Song extends Component {
    state = {
        track: {
            artists: [{}],
            album: {}
        }
    }

    getTrack = () => {
        const token = localStorage.getItem('token')
        const songId = this.props.match.params.songId

        fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => response.json())
        .then(data => this.setState({track: data}))
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount() {
        this.getSong()
        this.getTrack()
    }

    getSong = async () => {
        const userId = this.props.match.params.userId
        const playlistId = this.props.match.params.playlistId
        const songId = this.props.match.params.songId

        const res = await axios.get(`/api/users/${userId}/playlists/${playlistId}/songs/${songId}`)
        this.setState({ song: res.data})
    }

    render() {
        return (
            <div>
                {/* <h1>Hey from song</h1>
                {this.state.song.name}
                {this.state.song.artist}
                {this.state.song.album}
                {this.state.song.genre}
                <img src={this.state.song.albumImage}/> */}
                {this.state.track.name}
                {this.state.track.artists[0].name}
                {this.state.track.album.name}
            </div>
        );
    }
}

export default Song;