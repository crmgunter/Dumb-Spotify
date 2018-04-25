import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/User/Home";
import User from "./components/User/User";
import Playlist from "./components/Playlist/Playlist";
import Song from "./components/Song";
import Header from "./components/Header";
import Footer from './components/Footer'
import styled from "styled-components";

const General = styled.div`
  min-height: 100vh;
  text-align: center;
  background: #22252C;
  color: seashell;

  a {
    text-decoration: none;
    color: #00e155;
  }

  h1 {
    margin: 0;
  }
`;

class App extends Component {
  render() {
    return (
      <General>
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/users/:userId" component={User} />
              <Route
                exact
                path="/users/:userId/playlists/:playlistId"
                component={Playlist}
              />
              <Route
                exact
                path="/users/:userId/playlists/:playlistId/songs/:songId"
                component={Song}
              />
            </Switch>
            <Footer/>
          </div>
        </Router>
      </General>
    );
  }
}

export default App;
