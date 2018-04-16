import React, { Component } from "react";
import SearchResults from "./SearchResults";
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
            }}]
        },
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
      .then(this.setState({ toggleButton: true}))
  };

  search = () => {};

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="search">Search: </label>
          <input
            onChange={this.handleChange}
            type="text"
            name="search"
            value={this.state.search}
          />
          <button>search</button>
          <SearchResults results={this.state.results}
          toggleButton={this.state.toggleButton}
          userId={this.props.userId}
          playlistId={this.props.playlistId}
          getTracks={this.props.getTracks} />
        </form>
      </div>
    );
  }
}

export default Search;
