import React, { Component } from "react";
import axios from 'axios'

class NewUserForm extends Component {
  state = {
    username: "",
    image: "",
    location: ""
  };

  handleChange = (event) => {
      const name = event.target.name
      const newState = {...this.state}
      newState[name] = event.target.value
      this.setState(newState)
  }

  handleSubmit = async (event) => {
      event.preventDefault()
      const payload = {
          username: this.state.username,
          image: this.state.image,
          location: this.state.location
      }
      await axios.post(`/api/users`, payload)
      await this.props.getAllUsers()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">Username: </label>
            <input
              onChange={this.handleChange}
              type="text"
              name="username"
              value={this.state.username}
            />
          </div>
          <div>
            <label htmlFor="image">Image Url: </label>
            <input
              onChange={this.handleChange}
              type="text"
              name="image"
              value={this.state.image}
            />
          </div>
          <div>
              <label htmlFor="location">Location</label>
              <input
              onChange={this.handleChange}
              type="text"
              name="location"
              value={this.state.location}
              />
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default NewUserForm;
