// call和apply实现思路主要是：
// 判断是否是函数调用，若非函数调用抛异常
// 通过新对象（context）来调用函数
// 给context创建一个fn设置为需要调用的函数
// 结束调用完之后删除fn

Function.prototype.myCall() = function (context){
    if(typeof context !='function') throw new TypeError("input is not a function");
    context = context || window;
    // 保存this
    context.fn = this;
    // 保存参数
    let args = Array.from(arguments).slice(1);
    // 调用函数
    let result = context.fn(...args);
    delete context.fn;
    return context;
}