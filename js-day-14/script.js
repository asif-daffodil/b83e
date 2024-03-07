const form = document.getElementById("form");
        const result = document.getElementById("result");

        form.addEventListener("submit", (e) => {
            const year = document.getElementById("year").value;
            e.preventDefault();
            if(parseInt(year)){
                result.innerHTML = "Your data is a number";
            }else{
                result.innerHTML = "Your data is not a number";
            }
        })