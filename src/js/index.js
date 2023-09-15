import musicData from "../Data/musicData.json" assert { type: "json" } 
import { onYouTubeIframeAPIReady } from "./youtubePlayer.js";
import { Succulent } from "./succulent.js";
import { throttle } from "./utils/debounce.js";
import { changeReaction, removeActions, removeReActions, changeExpView, clearExp, preventClickUI} from "./uiHandler.js";

// 기본 다육이 세팅 및 화면 이벤트 추가
const planet = new Succulent({name: "다육이", level: 1, exp: 0});
console.log(planet.introduce());
setLevel();

const actionButtons = document.querySelectorAll(".btn-3d");
actionButtons.forEach(button => button.addEventListener("click", throttle(clickAction)));

export function setLevel() {
    const planetImg = document.querySelector(".box__image img");
    const textLevel = document.querySelector(".text__number");
    const level = planet.level > 10 ? 10 : planet.level;
    planetImg.src = `src/images/succulent_lv${level}.png`;
    textLevel.textContent = planet.level;
}
  
function clickAction(e) {
    const action = e.target.dataset.action;
    // 0. 버튼 클릭 UI로 막기
    preventClickUI(true);
    // 1. 캐릭터에 액션 이미지 보여주기
    changeAction(action);
    // 1.5 경험치 증가 화면 변경
    addExp(action);

    // 2. 캐릭터 리액션 이미지 변경하기 보여주기
    const second = action === "listening" ? 6000 : 2500;
    setTimeout(changeReaction(playSinger), 1200);

    // 3. 말풍선들 3초후 삭제
    setTimeout(removeActions, 2500);
    setTimeout(removeReActions, second);
}

let playSinger = "";
export function changeAction(action) {
    const actionBox = document.querySelector(".section__home div");
    const img = document.querySelector(".box__action img");
    actionBox.style.display = "block";
    img.src = `src/images/act_${action}.png`;
    if(action === "listening") {
        const playerContainer = document.querySelector(".player-container");
        // show player-container
        playerContainer.style.visibility = "visible";
        // add class play
        playerContainer.classList.add("play");
        // div change iframe
        const randomData = musicData[Math.floor(Math.random() * musicData.length)];
        const { singer } = randomData;
        playSinger = singer;
        onYouTubeIframeAPIReady(randomData);
    }else {
        playSinger = "";
    }
}

export function addExp(action) {
    // 경험치 증가
    switch(action) {
        case "sunny":
            console.log(planet.sunny());
            break;
        case "watering":
            console.log(planet.watering());
            break;
        case "listening":
            console.log(planet.listening());
            break;
    }
    changeExpView(planet);

    if(planet.maxExp <= planet.exp) {
        planet.levelUp();
        setTimeout(setLevel, 1000);
        setTimeout(clearExp, 1000);
    }
}
