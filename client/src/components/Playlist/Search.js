import React, { Component } from "react";
import SearchResults from "./SearchResults";
import styled from "styled-components";

const Body = styled.div`
  min-height: 100vh;
`;

const ButtonStyle = styled.button`
  min-width: 100px;
  margin-left: 10px;
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
  width: 200px;
  background: none;
  color: seashell;
`;


class Search extends Component {
  state = {
    toggleButton: false,
    search: "",
    results: {
      artists: {
        items: [
          {
            name: ""
          }
        ]
      },
      tracks: {
        items: [
          {
            name: "",
            artists: [{}],
            album: {
              name: "",
              images: [{ url: "" }]
            }
          }
        ]
      }
    }
  };

  handleChange = event => {
    const name = event.target.name;
    const newState = { ...this.state };
    newState[name] = event.target.value;
    this.setState(newState);
  };

  handleSubmit = event => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const query = `?q=:${this.state.search}&type=artist,track,album,playlist`;
    fetch(`https://api.spotify.com/v1/search/${query}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(data => this.setState({ results: data }))
      .then(console.log(this.state.results))
      .then(this.setState({ toggleButton: true }));
  };

  search = () => {};

  render() {
    return (
      <Body>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              
              <InputStyle
                onChange={this.handleChange}
                type="text"
                name="search"
                placeholder="Enter track name"
                value={this.state.search}
              />
              <ButtonStyle>search</ButtonStyle>
            </div>
            <SearchResults
              results={this.state.results}
              toggleButton={this.state.toggleButton}
              userId={this.props.userId}
              playlistId={this.props.playlistId}
              getTracks={this.props.getTracks}
            />
          </form>
        </div>
      </Body>
    );
  }
}

export default Search;
