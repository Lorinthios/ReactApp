import React, { Component } from 'react';
import Game from 'game.js'
import Battle from 'battle.js'
import Menu from 'menu.js'

const GameStates = {
  Game: 1,
  Menu: 2,
  Battle: 3
}

export default class GameManager extends Component{

  constructor(params){
      super(params);
    
      this.state = {
         gameState: GameStates.Menu
      };
  }
  
  render(){
      return (
        <div>
          { this.state.gameState == GameStates.Game ? <Game /> : null }
          { this.state.gameState == GameStates.Menu ? <Menu /> : null }
          { this.state.gameState == GameStates.Battle ? <Battle /> : null }
        </div>
      ); 
  }
  
  changeView(view){
      this.setState({
        gameState: view
      });
  }
  
}