import React, { Component } from "react";

class NewPlaylistForm extends Component {
  state = {
    name: ""
  };
  handleChange = event => {
    const name = event.target.name;
    const newState = { ...this.state };
    newState[name] = event.target.value;
    this.setState(newState);
  };

  handleSubmit = async event => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    console.log(token)
    const payload = {
      name: this.state.name
    };
    console.log(this.props.userId)
    fetch(`https://api.spotify.com/v1/users/${this.props.userId}/playlists`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: ({
        Authorization: `Bearer ${token}`,
        'Content-Type': `application/json`
      })
    }).then(res => res.json())
    .catch(err => console.log(err))
    .then(response => console.log(response))
    .then(data => this.setState({ playlist: data }))
    .then(this.props.getPlaylists())
  };

  render() {
    return (
      <div>
        <h1>hey</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              onChange={this.handleChange}
              type="text"
              name="name"
              value={this.state.name}
            />
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewPlaylistForm;
