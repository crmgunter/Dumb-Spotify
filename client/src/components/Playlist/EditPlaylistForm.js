import React, { Component } from "react";

class EditPlaylistForm extends Component {
    state = {
        name: ''
    }
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
    fetch(`https://api.spotify.com/v1/users/${this.props.userId}/playlists/${this.props.playlistId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: ({
        Authorization: `Bearer ${token}`,
        'Content-Type': `application/json`
      })
    }).then(res => res.json())
    .catch(err => console.log(err))
    .then(response => console.log(response))
    .then(data => this.setState({ playlist: data }))
    .then(this.props.getPlaylist())
  };

  render() {
    return (
      <div>
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

export default EditPlaylistForm;
