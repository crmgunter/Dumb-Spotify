import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import User from './components/User'
import Playlist from './components/Playlist'

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/users/:userId" component={User}/>
            <Route exact path="/users/:userId/playlists/:playlistId" component={Playlist}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
