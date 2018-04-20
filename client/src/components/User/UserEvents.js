import React, { Component } from "react";
class UserEvents extends Component {
  state = {
      events: [{
          venue: {
              name: ''
          }
      }]
  };

  componentDidMount() {
    // this.getTopArtistsEvents();
    this.getEvents();
  }

  //   getTopArtistsEvents = () => {
  //     let params = this.props.getHashParams();
  //     let accessToken = params.access_token;

  //     fetch("https://api.spotify.com/v1/me/top/artists", {
  //       headers: { Authorization: `Bearer ${accessToken}` }
  //     })
  //       .then(response => response.json())
  //       .then(data => {
  //         //   this.setState({ userTop: data })
  //         const artist = data;
  //         const allEvents = [];
  //         artist.items.map(artistName =>
  //           fetch(
  //             `https://rest.bandsintown.com/artists/${artistName.name}/events?app_id=698b530f4ba8c70ef531c9eae82e8204`
  //           )
  //             .then(response => response.json())
  //             .then(data => {
  //               const artistEvent = data;
  //               if (artistEvent) {
  //                 allEvents.push(artistEvent);
  //               }
  //             })
  //         );
  //         this.setState({ events: allEvents })
  //         console.log(this.state)
  //       });
  //   };

  getEvents = () => {
    fetch(
      `https://rest.bandsintown.com/artists/ttng/events?app_id=698b530f4ba8c70ef531c9eae82e8204`
    )
      .then(response => response.json())
    //   .then(data => console.log(data))
      .then(data => this.setState({ events: data}))
  };

  render() {
    return (
      <div>
        <h1>user Events</h1>
            {this.state.events.map(event => (
                <div>{event.venue.name}</div>
            ))}
      </div>
    );
  }
}

export default UserEvents;
