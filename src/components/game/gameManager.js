import React, { Component } from 'react';
import Game from './game.js';
import Menu from './menu.js';
import Battle from './battle.js';
import '../../styles/game/gameManager.css';

var BackgroundImage = require('../../images/GameboyFrame.png');

const GameStates = {
  Game: 1,
  Battle: 2
}

const gameFrameImage = {
  backgroundImage: 'url(' + BackgroundImage + ')',
  display: 'inline-block'
}

const inline = {
  display: 'inline-block'
}

export default class GameManager extends Component {

  constructor(params) {
    super(params);

    this.state = {
      gameState: GameStates.Game
    };

  }

  render() {
    return (
      <div>
        <div className="game-frame" style={gameFrameImage}>
          <div className="game-frame-internal">
            {this.state.gameState === GameStates.Game ? <Game /> : null}
            {this.state.gameState === GameStates.Battle ? <Battle /> : null}
          </div>
        </div>

        <div style={gameFrameImage}>

        </div>

        <div style={inline}>
          <Menu />
        </div>

      </div>
    );
  }

  changeView(view) {
    this.setState({
      gameState: view
    });
  }

}