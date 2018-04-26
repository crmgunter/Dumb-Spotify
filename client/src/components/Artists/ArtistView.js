import React, { Component } from "react";
import styled from 'styled-components'

const ButtonStyle = styled.button`
  min-width: 100px;
  margin: 10px;
  padding: 10px 5px;
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
    allShows: false
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
      } else {
        notLocationArray.push(event);
        this.setState({ noUserLocationEvents: notLocationArray})
      }
    });
  };

  toggleTheRest = () => {
    this.setState({ allShows: !this.state.allShows })
  }

  render() {
    return (
      <div>
        <ButtonStyle onClick={this.getEvents}>events</ButtonStyle>
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
          ) : (<div>This artist has no upcoming events near you.
          <div><ButtonStyle onClick={this.toggleTheRest}>See all events</ButtonStyle></div>
            {this.state.allShows ? (
              <div>
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
        ) : (
          "This artist has no upcoming events near you."
        )}
              </div>
            ) : null}
          </div>
          )}
        </div>) : null}
        


        {/* THIS CODE DISPLAYS ALL EVENTS FOR ARTIST 
        AND SHOULD BE SAVED FOR THE TIME BEING */}
        {/* ===================================================================== */}
        {/*  */}
      </div>
    );
  }
}

export default ArtistView;
