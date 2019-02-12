export default class MultitriggerSound {

    constructor(audioClip, instances) {
        this.audioClip = audioClip;
        this.clips = [audioClip];
        this.index = 0;
        this.volume = 0.5;
        this.instances = instances;

        for (var i = 1; i < instances; i++) {
            var newClip = new Audio(audioClip.src);
            newClip.load();

            this.clips.push(newClip);
        }
    }

    play() {
        this.index++;
        if (this.index >= this.clips.length)
            this.index = 0;

        var clip = this.clips[this.index];
        clip.volume = this.volume
        clip.play();
    }

    setVolume(volume) {
        this.volume = volume;
    }

}