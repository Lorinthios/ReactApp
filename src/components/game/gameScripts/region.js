import { MapSprite } from './sprite';
import SeemlessLoop from '../../../lib/SeemlessLoop';

export class Region {

    constructor(name, music, jumps, blocked, npcs) {
        this.name = name;
        this.music = music;
        this.jumps = jumps;
        this.blocked = blocked;
        this.npcs = npcs;

        this.loadMusic();
    }

    loadMusic() {
        var path = "sounds/music/regions/" + this.fileName + ".ogg";
        var audio = new Audio(path);
        this.audio = new SeemlessLoop(audio, 64000);
        this.audio.setVolume(0.5);
    }

    enter() {
        this.audio.start();
    }

    leave() {
        this.audio.pause();
    }
}

export class Map {

    constructor(context, name, width, height) {
        this.name = name;
        this.fileName = name.replace(/ /g, "_");
        this.map = new MapSprite(this.fileName, context, width, height);
    }

}

export class GameMap {

    constructor(context) {
        this.maps = {};
        this.regions = {};
        this.maps["Kanto"] = new Map(context, "Kanto", 6528, 6400);
    }
}