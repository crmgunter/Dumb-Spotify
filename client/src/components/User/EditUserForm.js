import React, { Component } from "react";
import axios from "axios";

class EditUserForm extends Component {
  state = {
    user: {
      username: "",
      image: "",
      location: ""
    }
  };

  handleChange = event => {
    const name = event.target.name;
    const newState = { ...this.props.user };
    newState[name] = event.target.value;
    this.setState({ user: newState });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const userId = this.props.user._id;
    const payload = this.state.user;
    axios.patch(`/api/users/${userId}`, payload).then(res => {
      this.setState({ user: res.data });
    });

    await this.props.getUser();
  };

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
              placeholder={this.props.user.username}
              value={this.state.username}
            />
          </div>
          <div>
            <label htmlFor="image">Image Url: </label>
            <input
              onChange={this.handleChange}
              type="text"
              name="image"
              placeholder={this.props.user.image}
              value={this.state.image}
            />
          </div>
          <div>
            <label htmlFor="location">Location</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="location"
              placeholder={this.props.user.location}
              value={this.state.location}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default EditUserForm;
