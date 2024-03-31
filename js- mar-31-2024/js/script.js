const date = document.querySelectorAll(".date")[0];
const time = document.querySelectorAll(".time")[0];
const day = document.querySelectorAll(".day")[0];
const dayChildren = day.children;
const dayChildrenArr = Array.from(dayChildren);
date.style.cssText = "color: red; font-size: 20px; font-family: Arial; font-weight: bold; text-align: center; padding: 10px; margin: 10px;";
time.style.cssText = "color: blue; font-size: 20px; font-family: Arial; font-weight: bold; text-align: center; padding: 10px; margin: 10px;";

setInterval(() => {

    /*
    date.style.color = "red";
    date.style.fontSize = "20px";
    date.style.fontFamily = "Arial";
    date.style.fontWeight = "bold";
    date.style.textAlign = "center";
    */



    const d = new Date();

    const tarikh = d.getDate();
    const month = d.toLocaleDateString('default', { month: 'long' });

    /* 
    const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthArr[d.getMonth()];  
    */

    const year = d.getFullYear();

    const hour = d.toLocaleTimeString('en-US', { hour: '2-digit', hour12: true }).replace(/ PM$/, '');
    const minute = d.getMinutes();
    const second = d.getSeconds();
    const ampm = d.toLocaleTimeString('en-US', { hour: '2-digit', hour12: true }).replace(/.* /, '');

    date.textContent = tarikh + " " + month + " " + year;
    time.textContent = hour + ":" + minute + ":" + second + " " + ampm;

    dayChildrenArr.forEach((dayChild) => {
        if (dayChild.textContent === d.toLocaleDateString('en-US', { weekday: 'short' })) {
            dayChild.classList.add("active");
        } else {
            dayChild.classList.remove("active");
        }
    });

}, 1000);