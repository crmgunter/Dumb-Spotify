import React, { Component } from 'react';

class UserPlaylists extends Component {
    state = {}

    componentDidMount() {
        this.getSpotifyUser()
    }

    getSpotifyUser = () => {
        const token = localStorage.getItem('token')
        console.log(token)
        fetch("https://api.spotify.com/v1/me", {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(response => response.json())
          .then(data => this.setState({ spotifyUser: data }))
          .then(data => console.log(this.state.spotifyUser.display_name));
    }

    render() {
        return (
            <div>
                <h1>Aye yo whaddup</h1>
            </div>
        );
    }
}

export default UserPlaylists;