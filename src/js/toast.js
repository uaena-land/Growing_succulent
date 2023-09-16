class Toast {
  constructor(message, color, time){
    this.message = message;
    this.color = color;
    this.time = time;
    this.element = null;
  
    const element = document.createElement('div');
    element.className = "toast-notification";
    this.element = element;
    const countElements = document.getElementsByClassName("toast-notification");
    
    element.style.opacity=0.8;
    element.style.marginBottom = (countElements.length * 55) + "px";
    element.style.backgroundColor = this.color;
    
    // 메시지
    const divMessage = document.createElement("div");
    divMessage.className = "message-container";
    divMessage.textContent = this.message;

    element.appendChild(divMessage);
    document.body.appendChild(element);
      
    setTimeout(function() {
      element.remove();
    }, this.time);
  }
}

const ToastType = {
  Danger : "#eb3b5a",
  Warning: "#fdcb6e",
  Success : "#00b894",
}

export const makeToast = (message) => {
  new Toast(message, ToastType.Success, 3000);
}