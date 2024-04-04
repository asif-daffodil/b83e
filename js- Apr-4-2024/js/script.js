const slider = document.querySelectorAll(".slider")[0];
const slidesArr = Array.from(slider.getElementsByClassName("slide"));


let x = 0;

const activeSlide = (x) => {
    slidesArr.forEach((slide) => slide.classList.add("d-none"));
    slidesArr[x].classList.remove("d-none");
}

const controlX = () => {
    if (x == slidesArr.length - 1) {
        x = 0;
    } else {
        x++;
    }
}

let autoRun = setInterval(() => {
    activeSlide(x);
    controlX()
}, 3000);

slider.addEventListener("mouseover", () => clearInterval(autoRun));
slider.addEventListener("mouseout", () => autoRun = setInterval(() => {activeSlide(x);controlX(x)}, 3000));