

function leepyearCalculaion(year){
    if((year%4 == 0) && (year%100 != 0) ||(year%400 == 0)){
        return true;
    }
    else{
        return false;
    }
}
const myYear = 1936;
const isMyYearLeepYear = leepyearCalculaion(myYear)
console.log(isMyYearLeepYear)