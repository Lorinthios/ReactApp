import { Direction } from './enum'

export class Controller {

    static Instance;

    constructor() {
        Controller.Instance = this;

        this.Direction = Direction.Idle;
        this.Up = false;
        this.Down = false;
        this.Left = false;
        this.Right = false;
        this.Sprint = false;
    }

    onKeyDown(e) {
        if (e.key === "w") {
            Controller.Instance.Direction = Direction.Up;
            Controller.Instance.Up = true;
        }
        else if (e.key === "a") {
            Controller.Instance.Direction = Direction.Left;
            Controller.Instance.Left = true;
        }
        else if (e.key === "s") {
            Controller.Instance.Direction = Direction.Down;
            Controller.Instance.Down = true;
        }
        else if (e.key === "d") {
            Controller.Instance.Direction = Direction.Right;
            Controller.Instance.Right = true;
        }
        else if (e.key === "Shift") {
            Controller.Instance.Sprint = true;
        }
    }

    onKeyUp(e) {
        if (e.key === "w") {
            Controller.Instance.Up = false;
        }
        else if (e.key === "a") {
            Controller.Instance.Left = false;
        }
        else if (e.key === "s") {
            Controller.Instance.Down = false;
        }
        else if (e.key === "d") {
            Controller.Instance.Right = false;
        }
        else if (e.key === "Shift") {
            Controller.Instance.Sprint = false;
        }

        if (!Controller.Instance.Up && !Controller.Instance.Left && !Controller.Instance.Down && !Controller.Instance.Right) {
            Controller.Instance.Direction = Direction.Idle;
        }
    }

    onKeyPress(e) {

    }

}