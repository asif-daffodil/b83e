const colorArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
document.getElementById("alert3").addEventListener('click', () => {
    let colorCode = "#";
    for (let i = 0; i < 6; i++) {
        colorCode += colorArr[Math.floor(Math.random() * 16)];
    }
    document.body.style.backgroundColor = colorCode;
});


const bd = document.getElementById("bd");
const lal = document.getElementById("lal");
const shobuj = document.getElementById("shobuj");

bd.style.width = "max-content";
bd.style.padding = "10px";

lal.addEventListener("click", () => {
    bd.style.backgroundColor = "red";
    bd.style.color = "white";
    bd.innerHTML = "Amar Bangladesh LaL";
});

shobuj.addEventListener("click", () => {
    bd.style.backgroundColor = "green";
    bd.style.color = "white";
    bd.innerHTML = "Amar Bangladesh Shobuj";
});

bd.addEventListener("mouseover", () => {
    bd.style.backgroundColor = "white";
    bd.style.color = "black";
    bd.innerHTML = "Amar Bangladesh";
});