const personName = "Asif Abir";
let personAge = 36;
personAge = 37;
/* 
function getPerson () {
    return personName;
}

const getPerson = function () {
    return personName;
}

const getPerson = () => {
    return personName;
}

*/

const getPerson = () => personName;

// js Math Object

/* console.log(Math.round(2.6));
console.log(Math.floor(2.9));
console.log(Math.ceil(2.1));
console.log(Math.pow(3, 3));
console.log(Math.sqrt(36));
console.log(Math.abs(-36));
console.log(Math.min(3, 5, 1, 9, 6));
console.log(Math.max(3, 5, 1, 9, 6));
console.log(Math.random()); */

// console.log(Math.floor(Math.random() * 15));

let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];

let color = "#";
let RandVal;

for (let i = 0; i < 6; i++) {
    RandVal = Math.floor(Math.random() * 16)
    color += arr[RandVal];
}

console.log(color);