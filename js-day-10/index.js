/* console.log("Hi");
console.log("Hello");

function nomo(){
    console.log("Nonoskar");
}

setTimeout(nomo, 1000);
console.log("Asslamuoyalaikum"); */

const asifPromise = new Promise(function (asifResolve, asifReject) {
    var x = 420;
    if (x == 0) {
        asifResolve("Asif tar promise rekheche");
    } else {
        asifReject("Asif tar promise rekheni");
    }
});

asifPromise.then(
    function (value) {
        console.log(value);
    },
    function (error) {
        console.log(error);
    }
)