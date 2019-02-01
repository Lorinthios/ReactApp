import React, { Component } from 'react';
import '../styles/App.css';

import GameManager from './game/gameManager.js'

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <GameManager />
      </div>
    );
  }
  
}

export default App;
