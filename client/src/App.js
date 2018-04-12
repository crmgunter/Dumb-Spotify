import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './components/User/Home'
import User from './components/User/User'
import Playlist from './components/Playlist'
import Song from './components/Song'

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/users/:userId" component={User}/>
            <Route exact path="/users/:userId/playlists/:playlistId" component={Playlist}/>
            <Route exact path="/users/:userId/playlists/:playlistId/songs/:songId" component={Song}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
