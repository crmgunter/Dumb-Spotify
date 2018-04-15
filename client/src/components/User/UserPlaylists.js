import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class UserPlaylists extends Component {
    state = {
        playlists: {
            items: [{}]
        }
    }

    componentDidMount() {
        this.getPlaylists()
    }

    getPlaylists = () => {
        const token = localStorage.getItem('token')
        fetch('https://api.spotify.com/v1/me/playlists', {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => response.json())
        .then(data => this.setState({ playlists: data }))
    }

    render() {
        return (
            <div>
                <h1>playlists:</h1>
                {this.state.playlists.items.map(playlist => (
                    <div>
                        <Link to={`/users/${this.props.userId}/playlists/${playlist.id}`}>
                        {playlist.name}
                        </Link>
                    </div>
                ))}
            </div>
        );
    }
}

export default UserPlaylists;