const init = async () => {
    const video = document.querySelector("body > video");
    if (!video) {
        console.log("Video not found");
        return;
    }
    const options = await new Promise((resolve) => {
        chrome.storage.sync.get({
            speed: 2,
            skip: true,
            fullscreen: false,
            volume_toggle: false,
            volume_value: 100
        }, (items) => {
            resolve(items);
        });
    });

    video.onplay = () => {
        video.playbackRate = options.speed;
        if (options.volume_toggle) {
            video.volume = options.volume_value / 100;
            console.log("Set video volume");
        }
        if (options.skip && video.currentTime < 11) {
            video.currentTime = 11;
            console.log("Skipped intro");
        }
        if (options.fullscreen) {
            video.requestFullscreen();
            console.log("Requested fullscreen")
        }
    };

    chrome.runtime.onMessage.addListener((message) => {
        if (message.action === "ending") {
            const video = document.querySelector("body > video");
            if (!video) {
                console.log("Video not found");
                return;
            }
            var end = video.duration - 25;
            console.log(`Jumped to ${Math.floor(end/60)}:${Math.floor(end%60)}`);
            video.currentTime = end;
            video.pause();
        }
    });
};

addEventListener("DOMContentLoaded", init());
