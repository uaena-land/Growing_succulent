// action
export function removeActions() {
    const actionBox = document.querySelector(".box__action");
    actionBox.style.display = "none";
}

// reaction
export function changeReaction(playSinger) {
    const reactBubble = document.querySelector(".react__bubble");
    const img = document.querySelector(".react__bubble img");
    const reaction = playSinger === "IU" ? "uaena" : "heart";
    reactBubble.style.display = "block";
    img.src = `src/images/react_${reaction}.png`;
}

export function removeReActions() {
    const reactBubble = document.querySelector(".react__bubble");
    reactBubble.style.display = "none";
    preventClickUI(false);
}

// Exp
const gauges = document.querySelectorAll(".gauge__col");
export function clearExp() {
    gauges.forEach((gauge) => {
        gauge.classList.remove("fill");
    });
}

export function changeExpView(planet) {
    const gauges = document.querySelectorAll(".gauge__col");

    gauges.forEach((gauge, index) => {
        if (index < planet.exp) {
            gauge.classList.add("fill");
        }
    });
}

// button
export function preventClickUI(flag) {
    const actionButtons = document.querySelectorAll(".btn-3d");
    actionButtons.forEach((actionButtons) => {
        if(flag) {
            actionButtons.classList.add('disabled');
            actionButtons.setAttribute("disabled", "disabled");
        }else {
            actionButtons.removeAttribute("disabled");
            actionButtons.classList.remove('disabled');
        }
    });
}