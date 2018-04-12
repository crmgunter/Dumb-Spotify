import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import Song from './Song'

class Playlist extends Component {
    state = {
        playlist: {
            songs: []
        }
    }

    componentDidMount(){
        this.getPlaylists()
    }

    getPlaylists = async () => {
        const userId = this.props.match.params.userId
        const playlistId = this.props.match.params.playlistId

        const res = await axios.get(`/api/users/${userId}/playlists/${playlistId}`)
        console.log(res.data)
        this.setState({ playlist: res.data })
    }
    render() {
        return (
            <div>
                <h1>Playlist</h1>
                    <div>
                        {this.state.playlist.name}
                        {this.state.playlist.songs.map(song => (
                            <div key={song._id}>
                            <Link to={`/users/${this.props.match.params.userId}/playlists/${this.props.match.params.playlistId}/songs/${song._id}`}>{song.name}</Link>
                            
                            </div>
                        ))}                        
                    </div>
            </div>
        );
    }
}

export default Playlist;