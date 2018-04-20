import React, { Component } from "react";
class UserEvents extends Component {
  state = {
    events: {
      _embedded: {
        events: [
          {
            name: ""
          }
        ]
      }
    }
  };

  componentDidMount() {
    this.getTopArtists();
    // this.getEvents();
  }

  getTopArtists = () => {
    let params = this.props.getHashParams();
    let accessToken = params.access_token;

    fetch("https://api.spotify.com/v1/me/top/artists", {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
      .then(response => response.json())
      .then(data => {
        //   this.setState({ userTop: data })
        const artist = data;
        console.log(artist);
        const artistResponse = artist.items.map(artistName =>
          fetch(
            `https://app.ticketmaster.com/discovery/v2/events.json?apikey=udwfh91BymplrOZLNeV8nhVhMd032Xrn&keyword=${
              artistName.name
            }&startDateTime=2018-04-19T18:35:00Z&city=atlanta`
          )
            .then(response => response.json())
            .then(data => {
              // console.log(data._embedded)
              const event = data._embedded;
              if (event) {
                this.setState({ events: event });
              }
            })
        );
      });
  };

  //   getEvents = () => {
  //     fetch(
  //       `https://app.ticketmaster.com/discovery/v2/events.json?apikey=udwfh91BymplrOZLNeV8nhVhMd032Xrn&keyword=ttng&startDateTime=2018-04-19T18:35:00Z&city=atlanta`
  //     )
  //       .then(response => response.json())
  //       .then(data => this.setState({ events: data }))
  //       .then(data => console.log(this.state.events));
  //   };

  render() {
    return (
      <div>
        <h1>user Events</h1>
        {/* {this.state.events._embedded? (
        <div>
            {this.state.events._embedded.events.map(event => (
          <div key={event.name}>{event.name}</div>
        ))}
        </div>
        ) : null } */}
      </div>
    );
  }
}

export default UserEvents;
