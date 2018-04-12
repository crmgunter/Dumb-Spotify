import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import User from './User'
import NewUserForm from './NewUserForm'


class Home extends Component {

    state = {
        users: [],
        form: false
    }

    componentDidMount() {
        this.getAllUsers()
    }

    getAllUsers = async () =>{
        const res = await axios.get("/api/users")
        console.log(res.data)
        this.setState({ users: res.data})
    }

    toggleForm = () => {
        this.setState({ form: !this.state.form })
    }

    render() {
        return (
            <div>
                <button onClick={this.toggleForm}>Create New User</button>
                {this.state.form? (<NewUserForm getAllUsers={this.getAllUsers}/>) : null }
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