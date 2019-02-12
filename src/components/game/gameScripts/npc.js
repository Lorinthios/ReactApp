import Character from './player'

export class Npc {

    constructor(x, y, name, dialog, pathing) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.dialog = dialog;
        this.pathing = pathing;
    }

}