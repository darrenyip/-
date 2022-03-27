// # 第一种
let mlt = new Object();
mlt.meat = ["鱼", "肉", "午餐肉"];
mlt.vegetabel = ['冬瓜','豆腐','娃娃菜','木瓜']
mlt.ingredient = ['辣椒','酱油','醋','糖']

mlt.effect() = function(){
  console.log(this.ingredient[0]+'秘制麻辣烫 健康卫生');
}
log(mlt);
mlt.effect();

// # 第二种

let secondMlt = {
  meat:["鱼", "肉", "午餐肉"],
  vegetabel : ['冬瓜','豆腐','娃娃菜','木瓜'],
  ingredient: ['辣椒','酱油','醋','糖'],
  effect(){
    console.log(); 
    console.log("第二种方法："+this.ingredient[0]+'秘制麻辣烫 健康卫生');
  } 
}
log(secondMlt);
secondMlt.effect();

// # 第三种 工厂模式 

function createMLT (meat, vegetabel,ingredient){
  let obj = new Object();
  obj.meat = ["鱼", "肉", "午餐肉"];
  obj.vegetabel = ['冬瓜','豆腐','娃娃菜','木瓜']
  obj.ingredient = ['辣椒','酱油','醋','糖']
  obj.effect() = function(){
    console.log(this.ingredient[0]+'秘制麻辣烫 健康卫生');
  }
  return obj;
}
let meat1 = ['鱼','牛肉'];
let meat2 = ['午餐肉','猪肉'];
let vegetabel1 = ['白菜','萝卜'];
let vegetabel2 = ['红菜头','花菜'];
let ingredient1 = ['辣椒','菜籽油'];
let ingredient2 = ['盐巴','酱油'];


let mlt1 = createMLT(meat1,vegetabel1,ingredient1);
let mlt2 = createMLT(meat2,vegetabel2,ingredient2);

console.log(mlt1);
console.log(mlt2);
mlt1.effect();
mlt2.effect();
console.log(mlt1 instanceof createMLT); // ->> false

// #第四种 工厂模式更新加强版 用New和funciton创建对象

function createMLTWithNew (meat, vegetabel,ingredient){
  this.meat = ["鱼", "肉", "午餐肉"];
  this.vegetabel = ['冬瓜','豆腐','娃娃菜','木瓜']
  this.ingredient = ['辣椒','酱油','醋','糖']
  this.effect() = function(){
    console.log(this.ingredient[0]+'秘制麻辣烫 健康卫生');
  }
}

let newMlt1 = new createMLTWithNew(meat1,vegetabel1,ingredient1);
let newMlt2 = new createMLTWithNew(meat2,vegetabel2,ingredient2);
newMlt1.effect();
newMlt2.effect();
console.log(newMlt1 instanceof createMLTWithNew); // ->> true

// #第五种  Object.create()


let createMLTWithObject  = {
  meat : ["鱼", "肉", "午餐肉"],
  vegetabel : ['冬瓜','豆腐','娃娃菜','木瓜'],
  ingredient : ['辣椒','酱油','醋','糖'],
  effect : function(){
    console.log(this.ingredient[0]+'秘制麻辣烫 健康卫生');
  }
}
let objMLT = Object.create(createMLTWithObject);
objMLT.vegetabel.push("鱼");
console.log(objMlt.vegetabel,createMLTWithObject.vegetabel); // 新对象和原型对象都被修改了


// #第六种  ES6  利用class创建-> 融合了构造函数和原型

class MLTCLASS {
  constructor(meat, vegetabel,ingredient){
    this.meat = meat;
    this.vegetabel = vegetabel;
    this.ingredient = ingredient;
    this.effect = function(){
      console.log(this.ingredient[0]+'秘制麻辣烫 健康卫生');
    }
  }
}

let mltClass1 = new MLTCLASS(meat1,vegetabel1,ingredient1)
let mltClass2 = new MLTCLASS(meat2,vegetabel2,ingredient2)

console.log(mltClass1,mltClass2);









