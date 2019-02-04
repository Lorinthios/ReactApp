import { Sprite, SpriteImage } from './sprite'

var boy_up = SpriteImage("");
var boy_down = SpriteImage(require("../../../images/trainers/boy/down.png"));
var boy_left = SpriteImage("");
var boy_right = SpriteImage("");

export class Character {

  constructor(x, y, up, down, left, right) {
    this.x = x;
    this.y = y;
    this.up = up;
    this.down = down;
    this.left = left;
    this.right = right;
    this.currentAnimation = down;
  }

  moveX(delta) {
    if (delta > 0)
      this.currentAnimation = this.down;
    if (delta < 0)
      this.currentAnimation = this.up;
  }

  moveY(delta) {
    if (delta > 0)
      this.currentAnimation = this.right;
    if (delta < 0)
      this.currentAnimation = this.left;
  }

  render() {
    this.currentAnimation.update();
    this.currentAnimation.render(this.x * 16, this.y * 16);
  }

}

export function Trainer(context, type) {

  if (type === 1) {
    return new Character(7, 5,
      new Sprite({
        context: context,
        width: 64,
        height: 21,
        image: boy_up,
        loop: true,
        numberOfFrames: 4,
        ticksPerFrame: 7
      }),
      new Sprite({
        context: context,
        width: 64,
        height: 21,
        image: boy_down,
        enabled: true,
        loop: true,
        numberOfFrames: 4,
        ticksPerFrame: 7
      }),
      new Sprite({
        context: context,
        width: 64,
        height: 21,
        image: boy_left,
        loop: true,
        numberOfFrames: 4,
        ticksPerFrame: 7
      }),
      new Sprite({
        context: context,
        width: 64,
        height: 21,
        image: boy_right,
        loop: true,
        numberOfFrames: 4,
        ticksPerFrame: 7
      }));
  }

}