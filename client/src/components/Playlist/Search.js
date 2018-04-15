import React, { Component } from "react";

class Search extends Component {
  state = {
    search: ""
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
    const query = `?q=:${this.state.search}&type=artist,track,album,playlist`
    fetch(`https://api.spotify.com/v1/search/${query}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(response => console.log(response))
      .then(data => this.setState({ results: data }))
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
        </form>
      </div>
    );
  }
}

export default Search;
