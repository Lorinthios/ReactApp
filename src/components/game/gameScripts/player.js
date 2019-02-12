import { Sprite, SpriteImage, SpriteOptions } from './sprite'

var boy_up = SpriteImage("images/trainers/boy/up.png");
var boy_down = SpriteImage("images/trainers/boy/down.png");
var boy_left = SpriteImage("images/trainers/boy/left.png");
var boy_right = SpriteImage("images/trainers/boy/right.png");

export class Character {

  constructor(x, y, up, down, left, right) {
    this.x = x;
    this.y = y;
    this.up = up;
    this.down = down;
    this.left = left;
    this.right = right;
    this.currentAnimation = this.down;
    this.moving = false;
  }

  moveX(delta, speed = 1) {
    if (this.moving)
      return;
    if (delta > 0)
      this.currentAnimation = this.right;
    if (delta < 0)
      this.currentAnimation = this.left;

    this.slideTo(this.x + (delta * 16), this.y, speed);
  }

  moveY(delta, speed = 1) {
    if (this.moving)
      return;
    if (delta > 0)
      this.currentAnimation = this.down;
    if (delta < 0)
      this.currentAnimation = this.up;

    this.slideTo(this.x, this.y + (delta * 16), speed);
  }

  slideTo(x, y, speed = 1) {
    var self = this;
    var needsLoop = true;
    this.moving = true;

    if (this.x === x && this.y === y) {
      this.moving = false;
      return;
    }
    else {
      var changeX = x - this.x;
      var changeY = y - this.y;

      if (changeX > 0) {
        this.x = this.x + speed;
        if (this.x > x) {
          this.x = x;
          needsLoop = false;
        }
      }
      else if (changeX < 0) {
        this.x = this.x - speed;
        if (this.x < x) {
          this.x = x;
          needsLoop = false;
        }
      }

      if (changeY > 0) {
        this.y = this.y + speed;
        if (this.y > y) {
          this.y = y;
          needsLoop = false;
        }
      }
      else if (changeY < 0) {
        this.y = this.y - speed;
        if (this.y < y) {
          this.y = y;
          needsLoop = false;
        }
      }
    }

    if (needsLoop)
      setTimeout(function () { self.slideTo(x, y, speed); }, 250 / (16 * speed));
    else
      this.moving = false;
  }

  render(x, y) {
    if (this.moving)
      this.currentAnimation.update();
    this.currentAnimation.render(x, y);
  }

}

export function Trainer(context, x, y, type) {

  if (type === 1) {
    return new Character(x, y,
      new Sprite(new SpriteOptions(context, boy_up, 64, 21, 7, 4, true)),
      new Sprite(new SpriteOptions(context, boy_down, 64, 21, 7, 4, true)),
      new Sprite(new SpriteOptions(context, boy_left, 64, 21, 7, 4, true)),
      new Sprite(new SpriteOptions(context, boy_right, 64, 21, 7, 4, true)));
  }

}