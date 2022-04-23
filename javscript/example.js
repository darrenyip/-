var name = "white";

function special() {
    console.log("name:" + this.name);
}
var girl = {
    name: "red",
    detail: function() {
        console.log("name" + this.name);
    },
    woman: {
        name: "yelow",
        detail: function() {
            console.log("name" + this.name);
        },
    },
    special: special,
};
girl.detail();
girl.woman.detail();
girl.special();
const ex = {
    name: "exgirl",
};
class boy {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    stand() {
        console.log("stand up");
    }
}
// console.log(newFunc);
const myDate = new Date();
// let object = myDate;
const newBoy = new boy("darren", 23);
console.log(newBoy);
object = newBoy;
do {
    object = Object.getPrototypeOf(object);
    console.log("ha: ", object);
} while (object);