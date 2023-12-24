const playListContainerTag = document.getElementsByClassName("playListContainer")[0];
const audioTag = document.getElementsByClassName("audioTag")[0];
const currentAndTotalTimeTag = document.getElementsByClassName("currentAndTotalTime")[0];
const customProgressBar = document.getElementById("progressBar");
const currentProgressTag = document.getElementById("currentProgress");
const playButtonTag = document.getElementsByClassName("playButton")[0];
const pauseButtonTag = document.getElementsByClassName("pauseButton")[0];
const previousButtonTag = document.getElementsByClassName("previousButton")[0];
const nextButtonTag = document.getElementsByClassName("nextButton")[0];

const tracks = [
    { trackId: "music/December Night- Linnith.mp3", title: "December Nya - Linnth" },
    { trackId: "music/La_La_Land_(2016_Movie)_Official_Clip_–_“City_Of_Stars”(360p)-mc.mp3", title: "La La Land Osc Song" },
    { trackId: "music/ဖန်သားနန်းတော်.mp3", title: "Phan Thar Nan Taw" },
    { trackId: "music/လေထဲကအိမ်.mp3", title: "Lay Htae Ka Eain" },
    { trackId: "music/သို့_အတိတ်က - Joe Lay.mp3", title: "From the past - Joe Lay" }
];

for (let i = 0; i < tracks.length; i++) {
    const trackTag = document.createElement("div");
    trackTag.addEventListener('click', () => {
        currentIndexPlay = i;
        songPlay();
    })

    trackTag.classList.add("trackItem");
    const title = (i + 1).toString() + ". " + tracks[i].title;
    trackTag.textContent = title;
    playListContainerTag.append(trackTag);
}

let duration = 0
let durationText = "00:00";
audioTag.addEventListener('loadeddata', () => {
    duration = Math.floor(audioTag.duration);
    durationText = createMinutesAndSecondText(duration);
})

audioTag.addEventListener('timeupdate', () => {
    const currentTime = Math.floor(audioTag.currentTime);
    const currentTimeText = createMinutesAndSecondText(currentTime);
    const durationAndcurrentTimeText = currentTimeText + " / " + durationText;
    currentAndTotalTimeTag.textContent = durationAndcurrentTimeText;
    updateCurrentProgress(currentTime);
})

const nextPlayTrack = () => {
    currentTrack = (currentIndexPlay + 1) % tracks.length;
    audioTag.src = tracks[currentTrack].trackId;
    audioTag.play();
}

audioTag.addEventListener('ended', nextPlayTrack);


const updateCurrentProgress = (currentTime) => {
    const currentProgressWidth = (300 / duration) * currentTime;
    currentProgressTag.style.width = currentProgressWidth.toString() + "px";
}

customProgressBar.addEventListener('click', (e) => {

    const barRect = customProgressBar.getBoundingClientRect();
    const clickX = e.clientX - barRect.left;
    const newWidth = (clickX / barRect.width) * 100;
    currentProgressTag.style.width = newWidth + '%';
    audioTag.currentTime = (newWidth / 100) * audioTag.duration;
    // audioTag.play();
})

const createMinutesAndSecondText = (totalSec) => {
    const minutes = Math.floor(totalSec / 60);
    const seconds = totalSec % 60;
    const minutesText = minutes < 10 ? "0" + minutes.toString() : minutes;
    const secondsText = seconds < 10 ? "0" + seconds.toString() : seconds;
    return minutesText + ":" + secondsText;
}

let currentIndexPlay = 0
isPlaying = false
playButtonTag.addEventListener('click', () => {
    const currentDuration = Math.floor(audioTag.currentTime);
    isPlaying = true;
    if (currentDuration === 0) {
        songPlay();
    } else {
        audioTag.play();
        playAndPauseBtn();
    }

})

pauseButtonTag.addEventListener('click', () => {
    audioTag.pause();
    isPlaying = false;
    playAndPauseBtn();
})

previousButtonTag.addEventListener("click", () => {
    if (currentIndexPlay === 0) {
        return;
    }
    currentIndexPlay -= 1
    songPlay();
})

nextButtonTag.addEventListener('click', () => {
    if (currentIndexPlay === tracks.length - 1) {
        return;
    }
    currentIndexPlay += 1
    songPlay();

})


const playAndPauseBtn = () => {
    if (isPlaying) {
        playButtonTag.style.display = "none";
        pauseButtonTag.style.display = "inline";
    } else {
        playButtonTag.style.display = "inline";
        pauseButtonTag.style.display = "none";
    }
}

const songPlay = () => {
    const songIdToPlay = tracks[currentIndexPlay].trackId;
    audioTag.src = songIdToPlay;
    audioTag.play();
    isPlaying = true;
    playAndPauseBtn();
}