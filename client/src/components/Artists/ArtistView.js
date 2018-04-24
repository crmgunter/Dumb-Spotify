import React, { Component } from "react";

const noShows = "There are no shows near you";

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
    ],
    noEvents: "There are no events near you."
  };

  getEvents = () => {
    fetch(
      `https://rest.bandsintown.com/artists/${
        this.props.artistName
      }/events?app_id=698b530f4ba8c70ef531c9eae82e8204`
    )
      .then(response => response.json())
      .then(data => {
        this.setState({ events: data })
        this.getLocalEvents()
      })
      
  };

  getLocalEvents = () => {
    this.setState({ view: !this.state.view})
    const locationArray = [];
    const notLocationArray = [];

    this.state.events.map(event => {
      if (this.props.location.includes(event.venue.city)) {
        locationArray.push(event);
        this.setState({userLocationEvents : locationArray})
        console.log(locationArray);
      } else {
        notLocationArray.push(event);
        this.setState({ noUserLocationEvents: notLocationArray})
        console.log(notLocationArray);
      }
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.getEvents}>events</button>
        {this.state.view ? (
        <div>
        {this.state.userLocationEvents ? (
          <div>
          {this.state.userLocationEvents.map((event) => (
            <div>
              <div>{event.venue.name}</div>
              <div>{event.venue.city}, {event.venue.region}</div>
              <div>{event.datetime}</div>
            </div>
          ))}  
          </div>
          ) : (<div>This artist has no upcoming events near you.</div>)}
        </div>) : null}
        


        {/* THIS CODE DISPLAYS ALL EVENTS FOR ARTIST 
        AND SHOULD BE SAVED FOR THE TIME BEING */}
        {/* ===================================================================== */}
        {/* {this.state.events[0] ? (
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
        ) : (
          "This artist has no upcoming events near you."
        )} */}
      </div>
    );
  }
}

export default ArtistView;
