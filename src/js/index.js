import musicData from "../Data/musicData.json" assert { type: "json" } 
import { onYouTubeIframeAPIReady } from "./youtubePlayer.js";
import { Succulent } from "./succulent.js";


const initData = getDataFromUrl() || {name: '다육이', level: 1, exp: 0}
setInterval(() => {
    if (planet){
        saveDataInUrl({name: planet.name, level: planet.level, exp: planet.exp})
    }
}, 1000)

const planet = new Succulent(initData);
const gauges = document.querySelectorAll(".gauge__col");
console.log(planet.introduce());
setLevel();

const actionButtons = document.querySelectorAll(".btn-white");
actionButtons.forEach(button => button.addEventListener("click", clickAction));

export function setLevel() {
    const planetImg = document.querySelector(".box__image img");
    const textLevel = document.querySelector(".text__number");
    const level = planet.level > 10 ? 10 : planet.level;
    planetImg.src = `src/images/succulent_lv${level}.png`;
    textLevel.textContent = planet.level;
}

function clickAction(e) {
    const action = e.target.dataset.action;
    // 1. 캐릭터에 액션 이미지 보여주기
    changeAction(action);
    // 1.5 경험치 증가 화면 변경
    addExp(action);

    // 2. 캐릭터 리액션 이미지 변경하기 보여주기
    const second = action === "listening" ? 7000 : 2500;
    setTimeout(changeReaction, 1200);

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
    changeExpView();

    if(planet.maxExp <= planet.exp) {
        planet.levelUp();
        setTimeout(setLevel, 1000);
        setTimeout(clearExp, 1000);
    }
}

export function clearExp() {
    gauges.forEach((gauge) => {
        gauge.classList.remove("fill");
    });
}

export function changeExpView() {
    console.log("exp", planet.exp);
    const gauges = document.querySelectorAll(".gauge__col");

    gauges.forEach((gauge, index) => {
        if (index < planet.exp) {
            gauge.classList.add("fill");
        }
    });
}

export function changeReaction() {
    const reactBubble = document.querySelector(".react__bubble");
    const img = document.querySelector(".react__bubble img");
    const reaction = playSinger === "IU" ? "uaena" : "heart";
    reactBubble.style.display = "block";
    img.src = `src/images/react_${reaction}.png`;
}

export function removeActions() {
    const actionBox = document.querySelector(".box__action");
    actionBox.style.display = "none";
}

export function removeReActions() {
    const reactBubble = document.querySelector(".react__bubble");
    reactBubble.style.display = "none";
}

// ROUTING

function utf8_to_b64( str ) {
  return window.btoa(unescape(encodeURIComponent( str )));
}

function b64_to_utf8( str ) {
  return decodeURIComponent(escape(window.atob( str )));
}

function saveDataInUrl(data){
    const dataEncoded = utf8_to_b64(JSON.stringify(data))
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.set('data', dataEncoded);
    // window.location.search = searchParams; reload 되므로 안됨
    let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
    window.history.pushState({path: newurl}, '', newurl);
}

function getDataFromUrl(){
    let params = new URLSearchParams(window.location.search);
    let data = params.get('data');
    if (!data){
        return null;    
    }
    
    return JSON.parse(b64_to_utf8(data));
}





