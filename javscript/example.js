function throttle(fn, delay) {
    let pre = 0;
    return function() {
        let context = this;
        let args = arguments;
        let now = new Date();
        if (now - pre > delay) {
            fn.apply(context, args);
            pre = now;
        }
    };
}

function debounce(fn, delay) {
    let timer;
    return function() {
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
            fn.apply(context, args);
        }, delay);
    };
}