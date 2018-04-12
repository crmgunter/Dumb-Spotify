import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
class User extends Component {
    state = {
        user: {
            playlists: []
        }
    }

    componentDidMount() {
        this.getUser()
    }

    getUser = async () => {
        const userId = this.props.match.params.userId
        const res = await axios.get(`/api/users/${userId}`)
        console.log(res.data)
        this.setState({ user: res.data})
    }
    render() {
        return (
            <div>
                <h1>hey from single user</h1>
                {this.state.user.username}
                {this.state.user.location}
                <img src={this.state.user.image} alt="user image"/>
                {this.state.user.playlists.map(playlist => (
                    <div key={playlist._id}>
                    <Link to={`/users/${this.state.user._id}/playlists/${playlist._id}`}>{playlist.name}</Link>
                    {playlist.description}
                    </div>
                ))}
            </div>
        );
    }
}

export default User;