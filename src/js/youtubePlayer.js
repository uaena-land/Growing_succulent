import { removeActions, removeReActions} from "./uiHandler.js";

const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//플레이어 변수 설정
let player;
// 재생 구간 설정
const section = {
    start: 90, // 반복 시작 시간(초)
    end: 100 // 반복 종료 시간(초)
};
export function onYouTubeIframeAPIReady(randomData) {
    // random music Data 뽑기
    const { id, start, end, name, albumCover } = randomData;
    onPlayerUISetting(name, albumCover);
    section.start = start;

    player = new YT.Player("youtubePlayer", {
        //width&height를 설정할 수 있으나, 따로 css영역으로 뺐다.
        videoId: id,
        playerVars: {
            start,
            end,
        },
        events: {
            "onReady": onPlayerReady , //로딩중에 이벤트 실행한다
            "onStateChange": onPlayerStateChange //플레이어 상태 변화 시 이벤트를 실행한다.
        }
    });
}

export function onPlayerReady() {
    //로딩된 후에 실행될 동작을 작성한다(소리 크기,동영상 속도를 미리 지정하는 것등등...)
    player.seekTo(section.start);
    player.playVideo();
}

export function onPlayerUISetting(name, albumCover) {
    // 앨범 이미지 변경
    const image = document.querySelector(".img-container img");
    image.src = `src/images/album/${albumCover}.webp`
    // 노래 제목 변경
    
    const textSongName = document.querySelector(".song-title");
    textSongName.textContent = name;
}

let done = false;

export function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(makeDom, 5000);
        done = true;
    }
}

export function makeDom() {
    const iframePlayer = document.getElementById("youtubePlayer");
    iframePlayer.remove();
    const divPlayer = document.createElement("div");
    divPlayer.id = "youtubePlayer";
    divPlayer.className = "player-cd";
    const playerContainer = document.querySelector(".player-container");
    playerContainer.prepend(divPlayer);
    done = false;
    // player 숨기고 
    playerContainer.style.visibility = "hidden";
    // play class remove
    playerContainer.classList.remove("play");

    // 3. 말풍선 삭제
    removeActions();
    removeReActions();
}