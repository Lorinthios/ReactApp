import React, { Component } from 'react';
import { Trainer } from './gameScripts/player';
import { TrainerType, Direction } from './gameScripts/enum';
import { GameMap } from './gameScripts/region';
import { Controller } from './gameScripts/controller';

export default class Game extends Component {

  static Instance;

  constructor(params) {
    super(params);

    Game.Instance = this;

    this.state = {
      actors: [],
      context: null
    };
  }

  componentDidMount() {
    var canvas = document.getElementById("GameCanvas");
    canvas.width = 480;
    canvas.height = 320;

    var context = canvas.getContext("2d");
    context.scale(2, 2);

    Game.Player = new Trainer(context, 1136, 4272, TrainerType.boy);
    Game.Map = new GameMap(context);
    Game.Controller = new Controller();

    this.setState({
      context: context,
      actors: []
    });

    window.onkeyup = Game.Controller.onKeyUp;
    window.onkeydown = Game.Controller.onKeyDown;
    window.onkeypress = Game.Controller.onKeyPress;

    Game.Instance.renderLoop();
  }

  render() {
    return (
      <div>
        <canvas id="GameCanvas"></canvas>
      </div>
    );
  }

  handleControls() {
    var direction = Game.Controller.Direction;
    var speed = Game.Controller.Sprint ? 1.5 : 1;

    var loc = (Game.Player.X / 16) + "_" + (Game.Player.Y / 16);

    if (direction !== Direction.Idle) {
      if (direction === Direction.Up)
        Game.Player.moveY(-1, speed);
      else if (direction === Direction.Left)
        Game.Player.moveX(-1, speed);
      else if (direction === Direction.Down)
        Game.Player.moveY(1, speed);
      else if (direction === Direction.Right)
        Game.Player.moveX(1, speed);
    }
  }

  renderLoop() {
    var self = Game.Instance;
    window.requestAnimationFrame(self.renderLoop);

    self.handleControls();

    var offset = {
      x: 7 * 16,
      y: 5 * 16 - 8
    }

    self.renderMap(offset);
    self.renderPlayer(offset);
    self.renderActors(offset);
  }

  renderMap(offset) {
    var self = Game.Map;

    var map = self.maps["Kanto"].map;
    map.render(-Game.Player.x + offset.x, -Game.Player.y + offset.y + 3);
  }

  renderPlayer(offset) {
    Game.Player.render(offset.x, offset.y);
  }

  renderActors(offset) {
    var actors = Game.Instance.state.actors;
    if (actors) {
      for (var i = 0; i < actors.length; i++) {
        actors[i].render(offset.x, offset.y + 3);
      }
    }
  }
}