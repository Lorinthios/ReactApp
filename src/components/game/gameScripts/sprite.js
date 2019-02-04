export class Sprite {

    constructor(options) {
        this.context = options.context;
        this.width = options.width;
        this.height = options.height;
        this.image = options.image;
        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = options.ticksPerFrame || 0;
        this.numberOfFrames = options.numberOfFrames || 1;
        this.loop = options.loop;
        this.enabled = options.enabled || false;
    }

    render(x, y) {
        // Clear the canvas
        this.context.clearRect(x, y, this.width, this.height);
        if (this.enabled) {
            this.context.drawImage(
                this.image,
                this.frameIndex * this.width / this.numberOfFrames,
                0,
                this.width / this.numberOfFrames,
                this.height,
                x,
                y,
                this.width / this.numberOfFrames,
                this.height);
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

export function SpriteImage(src) {
    var image = new Image();
    image.src = src;

    return image;
}