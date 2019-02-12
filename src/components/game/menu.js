import React, { Component } from 'react';
import MultitriggerSound from '../../lib/MultitriggerSound';
import '../../styles/game/menu.css';

export default class Menu extends Component {

  static Instance;

  constructor(props) {
    super(props);

    Menu.Instance = this;
    this.loadSounds();
  }

  loadSounds() {
    var clickAudio = new Audio("sounds/menu/Menu_Click.mp3");
    var clickSound = new MultitriggerSound(clickAudio, 5);

    Menu.Instance.Sounds = {
      click: clickSound
    };
  }

  render() {
    return (
      <div className="section" style={{ margin: "0px 24px", width: "300px", height: "360px" }}>
        <h2>Menu</h2>
        <hr />
        <div className="menu">
          <button onClick={this.onClick.bind(this, "Pokemon")}>Pokemon</button>
          <button onClick={this.onClick.bind(this, "Items")}>Items</button>
          <button onClick={this.onClick.bind(this, "Pokedex")}>Pokedex</button>
          <button onClick={this.onClick.bind(this, "Option")}>Options</button>
          <button onClick={this.onClick.bind(this, "Exit")}>Exit</button>
        </div>
      </div>
    );
  }

  onClick(option) {
    Menu.Instance.Sounds.click.play();
  }

}