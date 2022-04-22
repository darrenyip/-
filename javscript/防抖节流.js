function throttle1(func, wait) {
    let timeout = null;
    return function() {
        let context = this;
        let args = arguments;
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
                func.apply(context, args);
            }, wait);
        }
    };
}

function throttle2(func, wait) {
    var prev = 0;
    return function() {
        let now = Date.now();
        let context = this;
        let args = arguments;
        if (now - prev > wait) {
            func.apply(context, args);
            prev = now;
        }
    };
}

function throttle3(fn, delay) {
    let timer = null;
    let startTime = Date.now();
    return function() {
        let curr = Date.now();
        let remaining = delay(curr - startTime);
        let context = this;
        if (remaining <= 0) {
            fn.apply(context, args);
            startTime = curr;
        } else {
            timer = setTimeout(fn, remaining);
        }
    };
}

function debounce1(func, wait) {
    let timeout = null;
    return function() {
        let context = this;
        let args = arguments;
        if (timeout) {
            clearInterval(timeout);
        }
        let callNow = !timeout;
        timeout = setTimeout(() => {
            timeout = null;
        }, wait);
    };
}