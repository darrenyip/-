# 手动实现 instanceof

核心： 原型链 向上查找

```javascript
function myInstaceOf(left,right){
  if(typeof left !=='object' || left === null ) return false;
  let proto = Object.getPrototypeOf(left);
  while(true){
		//查找尽头
    if(proto ==null) return false;
    // 找到尽头
    if(proto == right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

console.log(myInstanceof("111", String)); //false
console.log(myInstanceof(new String("111"), String));//true
```