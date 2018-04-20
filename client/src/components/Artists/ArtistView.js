import React, { Component } from "react";

class ArtistView extends Component {
  state = {
    view: false,
    events: [
      {
        id: "",
        venue: {
          city: "",
          name: ""
        }
      }
    ]
  };

  viewIsTrue = () => {
    if (this.props.toggleEvents) {
      this.setState({ view: true });
    }
  };

  getEvents = () => {
    fetch(
      `https://rest.bandsintown.com/artists/${
        this.props.artistName
      }/events?app_id=698b530f4ba8c70ef531c9eae82e8204`
    )
      .then(response => response.json())
      .then(data => this.setState({ events: data }));
  };

  render() {
    //   this.getEvents()
    return (
      <div>
        <button onClick={this.getEvents}>events</button>
        {/* {console.log(this.state.events[0].id)} */}
        {this.state.events[0] ? (
          <div>
            {this.state.events.map(event => (
              <div>
                <div>{event.venue.name}</div>
                <div>
                  {event.venue.city}, {event.venue.region}
                </div>
                <div>{event.datetime}</div>
              </div>
            ))}
          </div>
        ) : "This artist has no upcoming events near you."}
      </div>
    );
  }
}

export default ArtistView;
