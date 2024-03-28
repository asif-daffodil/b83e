const form = document.getElementById ('form');
const result = document.getElementById ('result');
form.addEventListener('submit', (y) => {
    y.preventDefault();
    const userYear = document.getElementById('userYear').value;
    if(!parseInt(userYear)){
        result.innerHTML = 'Please enter Year in numerical values!' + '<br>';
        }
        else if(userYear % 4 == 0 && userYear % 100 != 0 || userYear % 400 == 0){
                result.innerHTML += userYear + ' is a Leap year :)' + '<br>'; 
            }
        else{
                result.innerHTML += userYear + ' not a Leap year :(' + '<br>';
            }
        });
        