var user      =1900;
var Number4   =user%4;
var Number100 =user%100;
var Number400 =user%400;


 if (Number4==0){
     if(Number100==0){
         if( Number400==0){
         console.log("It is a leap year");
         }
     }
 }
 
 if(Number4==0 && Number100!=0 ){
 console.log("It is a leap year");
 }
 
 
 else if(Number100!=0){
 console.log("It is not leap year");
 }