import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { RegionManager } from './region/regionManager';
import '../styles/App.css';

import GameManager from './game/gameManager.js'
import NavBar from './NavBar.js'

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <div className="content">
            <Route exact path="/" render={({ match }) => {
              return (<GameManager routeProps={match} />);
            }} />
            <Route path="/region" render={({ match }) => {
              return (<RegionManager routeProps={match} />);
            }} />
          </div>
        </div>
      </Router>
    );
  }

}

export default App;
