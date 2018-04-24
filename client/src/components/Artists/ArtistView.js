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
      .then(data => {
        this.setState({ events: data })
        this.getLocalEvents()
      })
      
  };

  getLocalEvents = () => {
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
    //   this.getEvents()
    

    return (
      <div>
        <button onClick={this.getEvents}>events</button>
        {/* {console.log(this.state.events[3])} */}
        {/* {this.state.events[0] ? (<div>
          {this.state.events.map((event, index) => (
          <div key={event.id}>
            {this.props.location.includes(event.venue.city) ? (
              <div>
                <div>{event.venue.name}</div>
                <div>
                  {event.venue.city}, {event.venue.region}
                </div>
                <div>{event.datetime}</div>
                <div><a href={event.url}>Get tickets</a></div>
              </div>
            ) : (<div>There are no upcoming shows near you.</div>)}
          </div>
        ))}
        </div>) : (<div>There are no upcoming events near you.</div>)} */}

        {/* {this.state.events.map((event) => {
          if(this.props.location.includes(event.venue.city)) {
            locationArray.push(event)
          console.log(locationArray)
          } else {
            notLocationArray.push(event)
            console.log(notLocationArray)
          }
        })} */}
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
        ) : (<div>Go fuck yourself</div>)}


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
