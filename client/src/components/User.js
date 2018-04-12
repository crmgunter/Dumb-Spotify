import React, { Component } from 'react';
import axios from 'axios'

class User extends Component {
    state = {
        user: {}
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
            </div>
        );
    }
}

export default User;