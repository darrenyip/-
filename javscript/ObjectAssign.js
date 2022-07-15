const course = {
    name: "cs 101",
};

const grade = {
    score: 102,
};

const finalResult = Object.assign(course, grade, { teacher: "tom" });
const clone = Object.assign({}, finalResult);
finalResult.score = 11;
clone.score = 12;
console.log(clone);