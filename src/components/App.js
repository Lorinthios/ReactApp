import React, { Component } from 'react';
import '../styles/App.css';

import GameManager from './game/gameManager.js'
import NavBar from './NavBar.js'

class App extends Component {

  render() {
    return (
      <div className="App">
        <NavBar />
        <GameManager />
      </div>
    );
  }

}

export default App;
