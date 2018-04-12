import React, { Component } from 'react';
import axios from 'axios'

class Song extends Component {
    state = {
        song: []
    }

    componentDidMount() {
        this.getSong()
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
                <h1>Hey from song</h1>
                {this.state.song.name}
                {this.state.song.artist}
                {this.state.song.album}
                {this.state.song.genre}
                <img src={this.state.song.albumImage}/>
            </div>
        );
    }
}

export default Song;