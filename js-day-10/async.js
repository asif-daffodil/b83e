async function asif (x)
{
    if (x < 10 && x > 0) {
        return "Hello World";
    }
    throw new Error("Asif tar promise rekheni");
}

asif(5).then(function (res) {console.log(res)}).catch(function (err) {console.log(err)});

asif(50).then(function (res) {console.log(res)}).catch(function (err) {console.log(err.message)});