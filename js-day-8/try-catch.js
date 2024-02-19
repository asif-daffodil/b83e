var shaon;

try{
    if(!shaon){
        throw new Error("Shaon is not available");
    }else{
        console.log(shaon);
    }
}catch(e){
    console.log("Error: ", e.message);
}finally{
    console.log("This is final");
}  

