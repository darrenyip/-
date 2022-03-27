// bind实现思路
// 判断是否是函数调用，若非函数调用抛异常
// 返回函数
// 判断函数的调用方式，是否是被new出来的
// new出来的话返回空对象，但是实例的__proto__指向_this的prototype
// 完成函数柯里化
// Array.prototype.slice.call()

Function.prototype.myBind = function (context) {
  if (typeof context !== "function") {
    throw new TypeError();
  }
  //保存调用bind函数
  const _this = this;
  const args = Array.prototype.slice.call(arguments, 1);
  return function F() {
    if (this instanceof F) {
      // 如果是new出来的
      // 返回一个空对象，并且使创建出来的_proto__指向this的prototype，完成函数currying
      return new _this(...args, ...arguments);
    } else {
      return _this.apply(context, args.concat(...arguments));
    }
  };
};
