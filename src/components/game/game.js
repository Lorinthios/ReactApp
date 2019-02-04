import React, { Component } from 'react';
import { Trainer } from './gameScripts/player';
import { TrainerType } from './gameScripts/enum';

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
    canvas.height = 240;

    var context = canvas.getContext("2d");
    context.scale(2, 2);

    this.setState({
      context: context,
      actors: [new Trainer(context, TrainerType.boy)]
    });

    Game.Instance.renderLoop();
  }

  render() {
    return (
      <div>
        <canvas id="GameCanvas"></canvas>
      </div>
    );
  }

  renderLoop() {
    window.requestAnimationFrame(Game.Instance.renderLoop);

    var actors = Game.Instance.state.actors;
    if (actors) {
      for (var i = 0; i < actors.length; i++) {
        actors[i].render();
      }
    }
  }
}