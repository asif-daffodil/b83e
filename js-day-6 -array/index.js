
var arr2 = ["This is a data 1", 2, true];

console.log(arr2[0]);
console.log(arr2.length);

var names = ["Abul", "Alamat", "Kalam", "Rahim", "Karim"];


for (var i = 0; i < names.length; i++) {
    console.log(names[i]);
}

// 10 random number in an array
var arrNum = [10, 5, 15, 6, 21, 39, 42, 61];

for (var i = 0; i < arrNum.length; i++) {
    if(arrNum[i] > 10 && arrNum[i] < 50) {
       console.log(arrNum[i]); 
    }
}

var arr2 = [10, 2, 5, 6, 9, 13, 53, 44, 46, 66, 73, 78, 84, 86];

for(var i = 0; i < arr2.length; i++) {
    if(arr2[i] % 2 == 0) {
        console.log(arr2[i]);
    }
}