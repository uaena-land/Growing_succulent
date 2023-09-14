class Succulent {
    constructor({name, level, exp}) { //생성자
        this.name = name;
        this.level = level;
        this.exp = exp;
        this.maxExp = 10;
    }

    introduce() {
        return `안녕, 난 ${this.name} 이고 레벨은 ${this.level}이야.`;
    }

    sunny() {
        this.exp = this.exp + 2;
        return `레벨은 ${this.level}이고 경험치는 ${this.exp}야.`;
    }

    watering() {
        this.exp = this.exp + 3;
        return `레벨은 ${this.level}이고 경험치는 ${this.exp}야.`;
    }

    listening() {
        this.exp = this.exp + 5;
        return `레벨은 ${this.level}이고 경험치는 ${this.exp}야.`;
    }

    updateState() {
        // if exp max <= exp
        if(this.maxExp <= this.exp) {
            this.levelUp();
        }
    }
    levelUp() {
        this.level = this.level + 1;
        console.log(`현재 레벨은 ${this.level} 입니다.`);
        this.exp = 0;
    }
}

const planet = new Succulent({name: '다육이', level: 1, exp: 0});
const gauges = document.querySelectorAll(".gauge__col");
console.log(planet.introduce());
setLevel();

function setLevel() {
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
    setTimeout(changeReaction, 1200);

    // 3. 말풍선들 3초후 삭제
    setTimeout(removeActions, 2000);
    setTimeout(removeReActions, 2000);
}

function changeAction(action) {
    const actionBox = document.querySelector(".section__home div");
    const img = document.querySelector(".box__action img");
    actionBox.style.display = 'block';
    img.src = `src/images/act_${action}.png`;
    console.log(action);
}

function addExp(action) {
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

function clearExp() {
    gauges.forEach((gauge) => {
        gauge.classList.remove("fill");
    });
}

function changeExpView() {
    console.log("exp", planet.exp);
    const gauges = document.querySelectorAll(".gauge__col");

    gauges.forEach((gauge, index) => {
        if (index < planet.exp) {
            gauge.classList.add("fill");
        }
    });
}

function changeReaction() {
    const reactBubble = document.querySelector(".react__bubble");
    reactBubble.style.display = 'block';
}

function removeActions() {
    const actionBox = document.querySelector(".box__action");
    actionBox.style.display = "none";
}

function removeReActions() {
    const reactBubble = document.querySelector(".react__bubble");
    reactBubble.style.display = "none";
}
