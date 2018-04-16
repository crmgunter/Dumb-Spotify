import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './components/User/Home'
import User from './components/User/User'
import Playlist from './components/Playlist/Playlist'
import Song from './components/Song'
import styled from 'styled-components'

const General = styled.div`
min-height: 100vh;
text-align: center;
background: black;
color: green;

a {
  text-decoration: none;
  color: green;
}

h1 {
  margin: 0;
}
`

class App extends Component {
  render() {
    return (
      <General>
        <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/users/:userId" component={User}/>
            <Route exact path="/users/:userId/playlists/:playlistId" component={Playlist}/>
            <Route exact path="/users/:userId/playlists/:playlistId/songs/:songId" component={Song}/>
          </Switch>
        </Router>
      </General>
    );
  }
}

export default App;
