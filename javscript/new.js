// new内部：

// 创建一个新对象
// 使新对象的__proto__指向原函数的prototype
// 改变this指向（指向新的obj）并执行该函数，执行结果保存起来作为result
// 判断执行函数的结果是不是null或Undefined，如果是则返回之前的新对象，如果不是则返回result

function myNew(fn, ...args) {
  let obj = {};
  obj.__proto__ = fn.prototype;
  let result = fn.apply(obj, args);
  return result instanceof Object ? result : obj;
}

// 问：
// 字面量new Object() 和 Object.create(null)创建出来的对象有什么区别
// 答：
// 字面量和new创建出来的对象会继承Object的方法和属性，
// 他们的隐式原型会指向Object的显式原型，
// 而 Object.create(null)创建出来的对象原型为null，作为原型链的顶端，
// 自然也没有继承Object的方法和属性
