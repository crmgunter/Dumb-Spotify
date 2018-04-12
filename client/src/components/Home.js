import React, { Component } from 'react';
import axios from 'axios'
import User from './User'
import { Link } from 'react-router-dom'

class Home extends Component {

    state = {
        users: []
    }

    componentDidMount() {
        this.getAllUsers()
    }

    getAllUsers = async () =>{
        const res = await axios.get("/api/users")
        console.log(res.data)
        this.setState({ users: res.data})
    }

    render() {
        return (
            <div>
                <h1>Hey!</h1>
                {this.state.users.map(user => (
                    <div key={user._id}>
                    <Link to={`users/${user._id}`}>{user.username}</Link>
                    {user.location}
                    <img src={user.image} alt="user image"/>
                    </div>
                ))}
            </div>
        );
    }
}

export default Home;