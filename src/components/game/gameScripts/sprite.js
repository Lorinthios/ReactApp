export class Sprite {

    constructor(options) {
        this.context = options.context;
        this.width = options.width;
        this.height = options.height;
        this.image = options.image;
        this.x = 0;
        this.y = 0;
        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = options.ticksPerFrame || 0;
        this.numberOfFrames = options.numberOfFrames || 1;
        this.loop = options.loop || false;
        this.enabled = options.enabled || true;
    }

    render(x, y) {
        // Clear the canvas
        //this.context.clearRect(x, y, this.width, this.height);
        if (this.enabled) {
            this.context.drawImage(
                this.image,
                this.frameIndex * this.width / this.numberOfFrames,
                0,
                this.width / this.numberOfFrames,
                this.height,
                x || this.x,
                y || this.y,
                this.width / this.numberOfFrames,
                this.height);
        }
    }

    renderPartial(imgX, imgY, targetX, targetY, width, height) {
        if (this.enabled) {
            this.context.drawImage(
                this.image,
                imgX,
                imgY,
                width,
                height,
                targetX,
                targetY,
                width,
                height
            );
        }
    }

    update() {
        if (this.numberOfFrames === 1)
            return;

        this.tickCount += 1;

        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;

            // If the current frame index is in range
            if (this.frameIndex < this.numberOfFrames - 1) {
                // Go to the next frame
                this.frameIndex += 1;
            } else if (this.loop) {
                this.frameIndex = 0;
            }
        }
    }
}

export class SpriteOptions {

    constructor(context, image, width, height, ticksPerFrame = 0, numberOfFrames = 1, loop = true, enabled = true) {
        this.context = context;
        this.image = image;
        this.width = width;
        this.height = height;
        this.ticksPerFrame = ticksPerFrame;
        this.numberOfFrames = numberOfFrames;
        this.loop = loop;
        this.enabled = enabled;
    }

}

export function SpriteImage(src) {
    var image = new Image();
    image.src = src;

    return image;
}

export class MapSprite {

    constructor(name, context, width, height) {
        var path = "images/regions/" + name + ".png";
        var image = new SpriteImage(path);

        this.sprite = new Sprite(new SpriteOptions(
            context, image, width, height
        ));
    }

    render(x, y) {
        this.sprite.render(x, y);
    }

    renderPartial(x, y, sizeX, sizeY) {
        this.sprite.renderPartial(x, y, x, y, sizeX, sizeY);
    }
}