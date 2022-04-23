// call和apply实现思路主要是：
// 判断是否是函数调用，若非函数调用抛异常
// 通过新对象（context）来调用函数
// 给context创建一个fn设置为需要调用的函数
// 结束调用完之后删除fn

//f.call(o)其原理就是先通过 o.m = f 将 f作为o的某个临时属性m存储，然后执行m，执行完毕后将m属性删除。
// o.m=f;
// o.m();
// delete o.m;

Function.prototype.myCall() = function(context) {
    if (typeof context != 'function') throw new TypeError("input is not a function");
    context = context || window;
    // 保存this
    context.fn = this;
    // 保存参数
    let args = Array.from(arguments).slice(1);
    let args2 = [...arguments].slice(1);

    // 调用函数
    let result = context.fn(...args);
    delete context.fn;
    return result;
}

Function.prototype.myNewCall = function(context) {
    if (typeof context !== 'function') throw new TypeError("not a function");
    context = context || window;
    context.fn = this;
    let args = [...arguments].slice(1);
    let result = context.fn(...args);
    delete context.fn;
    return result;
}