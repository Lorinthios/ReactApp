export default class SeemlessLoop {

    constructor(audioClip, duration) {
        this.clip_0 = audioClip;
        this.clip_1 = new Audio(audioClip.src);
        this.volume = 1;
        this.currentClip = null;
        this.index = 1;
        this.playing = false;
        this.isReady = false;
        this.duration = duration;

        var self = this;

        this.clip_0.addEventListener("canplaythrough", function () { self.ready() });
        this.clip_1.addEventListener("canplaythrough", function () { self.ready() });

        this.clip_0.load();
        this.clip_1.load();
    }

    start() {
        this.playing = true;
        if (this.isReady)
            this.loop();
    }

    ready() {
        if (this.isReady)
            return;

        this.isReady = true;
        if (this.playing)
            this.loop();
    }

    incrementIndex() {
        this.index++;
        if (this.index > 1)
            this.index = 0;

        this.reset(this.currentClip);
        this.currentClip = this["clip_" + this.index];
    }

    setVolume(volume) {
        this.volume = volume;
        this.clip_0.volume = volume;
        this.clip_1.volume = volume;
    }

    reset(clip) {
        if (!clip)
            return;
        if (clip.readyState >= 3) {
            setTimeout(function () {
                clip.pause();
                clip.currentTime = 0;
            }, 100);
        }
    }

    loop() {
        this.incrementIndex();
        if (this.currentClip != null && this.currentClip.readyState >= 3) {
            this.currentClip.play();
            this.currentClip.volume = this.volume;
            this.currentClip.currentTime = 0;
        }

        var self = this;

        setTimeout(function () {
            self.loop();
        }, this.duration - 20);
    }

    stop() {
        this.playing = false;
        this.clip_0.pause();
        this.clip_1.pause();
    }

}