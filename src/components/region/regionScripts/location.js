export class Location {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

}

export class DoorLocation extends Location {

    constructor(x, y, destination) {
        super(x, y);
        this.destination = destination;
    }

}

export class SignLocation extends Location {

    constructor(x, y, text) {
        super(x, y);
        this.text = text;
    }

}

export class RegionLocation extends Location {

    constructor(x, y, regionName) {
        super(x, y);
        this.regionName = regionName;
    }

}

export class Area extends Location {

    constructor(x, y, width, height) {
        super(x, y);
        this.width = width || 1;
        this.height = height || 1;
    }

    contains(location) {
        var greaterThan = location.x >= this.x && location.y >= this.y;
        var lessThan = location.x < (this.x + this.width) && location.y < (this.y + this.height);
        return greaterThan && lessThan;
    }

}