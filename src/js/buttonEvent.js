
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
    resetGame();
    closeModal();
}

export function closeModal() {
    modal.classList.remove("show");
}