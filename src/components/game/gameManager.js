import React, { Component } from 'react';
import Game from './game';
import Menu from './menu';
import Chat from './chat'
import Battle from './battle.js';
import { GameStates } from './gameScripts/enum';
import '../../styles/game/gameManager.css';

const gameFrameImage = {
  backgroundImage: "url('images/GameboyFrame.png')",
  display: 'inline-block'
}

const inline = {
  display: 'inline-block',
  position: 'absolute'
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
        <div>
          <div className="game-frame" style={gameFrameImage}>
            <div className="game-frame-internal">
              {this.state.gameState === GameStates.Game ? <Game /> : null}
              {this.state.gameState === GameStates.Battle ? <Battle /> : null}
            </div>
          </div>

          <div style={inline}>
            <Menu />
          </div>

        </div>
        <div>
          <Chat />
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