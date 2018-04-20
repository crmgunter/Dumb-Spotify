import React, { Component } from "react";
import ArtistView from '../Artists/ArtistView'

class UserEvents extends Component {
  state = {
    events: []
  };

  componentDidMount() {
    // this.getTopArtistsEvents();
    // this.getEvents();
  }

//   getTopArtistsEvents = () => {
//     let params = this.props.getHashParams();
//     let accessToken = params.access_token;

    // fetch("https://api.spotify.com/v1/me/top/artists", {
    //   headers: { Authorization: `Bearer ${accessToken}` }
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     //   this.setState({ userTop: data })
    //     const artist = data;
    //     const allEvents = [];
    //     artist.items.map(artistName => {
    //       allEvents.push(artistName.name);
    //     });
    //     this.setState({ events: allEvents });
    //     const eventCatcher = []
    //     this.state.events.map(name => {
    //       console.log(name);
    //       fetch(
    //         `https://rest.bandsintown.com/artists/${
    //           name
    //         }/events?app_id=698b530f4ba8c70ef531c9eae82e8204`
    //       )
    //         .then(response => response.json())
    //         .then(data => eventCatcher.push(data));
    //     })
    //     this.setState({ stuff: eventCatcher })
    //     })
//   };

    // getEvents = () => {
    //   fetch(
    //     `https://rest.bandsintown.com/artists/mannequin%20pussy/events?app_id=698b530f4ba8c70ef531c9eae82e8204`
    //   )
    //     .then(response => response.json())
    //     //   .then(data => console.log(data))
    //     .then(data => this.setState({ events: data }));
    // };



  render() {
    return (
      <div>
        <h1>user Events</h1>
        <button onClick={this.toggleEvents}>Get events</button>
        {this.state.toggleEvents ? (<ArtistView/>) : null}
      </div>
    );
  }
}

export default UserEvents;
