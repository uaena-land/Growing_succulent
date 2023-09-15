export function debounce(func, delay = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

export function debounce_leading(func, timeout = 2000) {
    let timer;
    return (...args) => {
      if (!timer) {
        func.apply(this, args);
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = undefined;
      }, timeout);
    };
  }

  export function throttle(func, limit = 1000) {
    let waiting = false;
    return function () {
      if (!waiting) {
        func.apply(this, arguments);
        waiting = true;
        setTimeout(() => {
          waiting = false;
        }, limit);
      }
    };
  }