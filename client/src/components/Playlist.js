import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import Song from './Song'

class Playlist extends Component {
    state = {
        tracks: {
                items: [{
                    track: {
                        name: ''
                    }
                }]
        }
    }

    componentDidMount(){
        // this.getPlaylists()
        this.getTracks()
        
    }

    // getPlaylists = async () => {
    //     const userId = this.props.match.params.userId
    //     const playlistId = this.props.match.params.playlistId

    //     const res = await axios.get(`/api/users/${userId}/playlists/${playlistId}`)
    //     console.log(res.data)
    //     this.setState({ playlist: res.data })
    // }

    // getPlaylists = () => {
    //     const token = localStorage.getItem('token')
    //     fetch(`https://api.spotify.com/v1/me/playlists`, {
    //         headers: { Authorization: `Bearer ${token}`}
    //     })
    //     .then(response => response.json())
    //     .then(data => this.setState({ playlists: data }))
    // }

    getTracks = () => {
        const token = localStorage.getItem('token')
        const userId = this.props.match.params.userId
        const playlistId = this.props.match.params.playlistId

        fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => response.json())
        .then(data => this.setState({tracks: data}))
        .catch(err => {
            console.log(err)
        })
    }
    
    
    render() {
        return (
            <div>
                <h1>Playlist</h1>
                    <div>
                        {/* {this.state.playlist.name}
                        {this.state.playlist.songs.map(song => (
                            <div key={song._id}>
                            <Link to={`/users/${this.props.match.params.userId}/playlists/${this.props.match.params.playlistId}/songs/${song._id}`}>{song.name}</Link>
                            
                            </div>
                        ))}                         */}
                    </div>
                    <div>
                        {/* IMPORTANT!!!
                        IF USER PLAYLIST WAS NOT MADE BY THE USER SIGNED IT, IT WILL ERROR OUT! */}
                    {this.state.tracks.items.map(track => (
                        <div>
                            {track.track.name}
                        </div>
                    ))}
                    </div>
            </div>
        );
    }
}

export default Playlist;