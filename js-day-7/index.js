/* for(var i = 0; i < 10; i++) {
    if(i == 5){
        break;
    }
    console.log(i);
}

//  continue

for(var i = 0; i < 10; i++) {
    if(i == 5){
        continue;
    }
    console.log(i);
}
 */

arr = [7, 10, 17, 22, 24, 27, 32, 31, 35, 40, 55, 45, 59, 65, 66,];

for(var i = 0; i < arr.length; i++) {
    if(arr[i] % 7 == 3){
        if(arr[i] % 6 == 3){
            console.log(arr[i]);
            break;
        }
        continue;
    }
    console.log(arr[i]);
}