// call和apply实现思路主要是：
// 判断是否是函数调用，若非函数调用抛异常
// 通过新对象（context）来调用函数
// 给context创建一个fn设置为需要调用的函数
// 结束调用完之后删除fn

Function.prototype.myApply = function (context) {
  if (typeof context !== "function") {
    throw new TypeError();
  }
  let result;
  context = context || window;
  context.fn = this;
  // 判断是否传入参数
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    // this
    result = context.fn();
  }
  delete context.fn;
  return result;
};
