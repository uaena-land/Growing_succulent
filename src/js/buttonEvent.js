
import { makeToast } from "./toast.js"

const modal = document.querySelector(".modal");

export function copyUrl() {
    navigator.clipboard.writeText(window.location.href);
    makeToast('복사완료');
}

export function resetGame() {
    window.location.href = window.location.origin;
}

export function openModal() {
    modal.classList.add("show");
}

export function clickYesButton() {
    console.log("clickYesButton");
    resetGame();
    // modal 실행 및 성공 토스트 출력;
    makeToast("다육이 레벨을 초기화 했습니다");
    closeModal();
}

export function closeModal() {
    modal.classList.remove("show");
}