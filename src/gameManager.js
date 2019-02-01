import React, { Component } from 'react';
import Game from 'game.js';
import Menu from 'menu.js';
import Battle from 'battle.js';

const GameStates = {
  Game: 1,
  Menu: 2,
  Battle: 3
}

export default class GameManager extends Component{

  constructor(params){
      super(params);
    
      this.state = {
         gameState: GameStates.Game
      };
  }
  
    render(){
      return (
        <div>
          <button onClick={function(){ this.changeView(GameStates.Game) }}>Game</button>
          <button onClick={function(){ this.changeView(GameStates.Menu) }}>Menu</button>
          <button onClick={function(){ this.changeView(GameStates.Battle) }}>Battle</button>
          
          <div>
            { this.state.gameState == GameStates.Game ? <Game /> : null }
            { this.state.gameState == GameStates.Menu ? <Menu /> : null }
            { this.state.gameState == GameStates.Battle ? <Battle /> : null }
          </div>
          
        </div>
      ); 
  }
  
  changeView(view){
      this.setState({
        gameState: view
      });
  }
  
}