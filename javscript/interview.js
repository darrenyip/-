function toRawType(value) {
    return Object.prototype.toString.call(value).slice(8, -1);
}

function myInstanceof(left, right) {
    //获取（构造）函数的（显式）原型
    let rp = right.prototype;
    //获取对象的（隐式）原型
    left = left.__proto__;
    //判断对象的（隐式）原型是否等于（构造）函数的（显式）原型
    while (true) {
        if (left === null) {
            return false;
        }
        if (left === rp) {
            return true;
        }
        left = left.__proto__;
    }
}
// .clearfix:after{
//     content: '';
//     display: block; /*或者 table*/
//     clear: both;
// }