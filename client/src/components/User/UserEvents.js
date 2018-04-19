import React, { Component } from "react";
import axios from "axios";
class UserEvents extends Component {
    state = {
        events: {
            _embedded: {
                events: [{
                    name: ''
                }]
            }
        }
    }

    componentDidMount() {
        this.getEvents()
    }

  getEvents = async () => {
    fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?apikey=udwfh91BymplrOZLNeV8nhVhMd032Xrn&keyword=ttng&startDateTime=2018-04-19T18:35:00Z&city=atlanta`
    ).then(response => response.json())
    .then(data => this.setState({ events: data }))
    .then(data => console.log(this.state.events));
  };

  render() {
    return (
      <div>
        <h1>user Events</h1>
        {this.state.events._embedded.events.map((event) => (
            <div>
                {event.name}
            </div>
        ))}
      </div>
    );
  }
}

export default UserEvents;
