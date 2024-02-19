var arr1 = ["Abul", "Alam", "Babul", "Bulbul", "Kabul"];

arr1.map(function(val){
    console.log(val);
})

console.log("---")

$arr2 = arr1.filter(function(val, i) {
    return i > 0 && i < arr1.length - 1
});

$arr2.map(function(val){
    console.log(val);
})