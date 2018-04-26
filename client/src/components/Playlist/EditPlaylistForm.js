import React, { Component } from "react";
import styled from 'styled-components'

const ButtonStyle = styled.button`
  min-width: 100px;
  margin: 10px;
  padding: 15px;
  background: none;
  color: #e14658;
  font-size: 13px;
  border-radius: 5px;
  border: #e14658 solid 1px;

  :hover {
    background: #e14658;
    color: seashell;
    border: 1px solid seashell;
    cursor: pointer;
  }
`;

const InputStyle = styled.input`
border: 1px solid #e14658;
border-radius: 5px;
height: 30px;
background: none;
color: seashell;
`

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
            <InputStyle
              onChange={this.handleChange}
              type="text"
              placeholder="Enter New Name"
              name="name"
              value={this.state.name}
            />
            <ButtonStyle>Submit</ButtonStyle>
          </div>
        </form>
      </div>
    );
  }
}

export default EditPlaylistForm;
