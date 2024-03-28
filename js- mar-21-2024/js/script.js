const headers = document.querySelectorAll('.tab-headers')[0];
const contents = document.querySelectorAll('.tab-contents')[0];
const headersArr = Array.from(headers.children);
const contentsArr = Array.from(contents.children);




headersArr.forEach((header, index) => {
    header.addEventListener('click', () => {
        headersArr.forEach((h, i) => {
            if (i === index) {
                h.classList.add('active');
                contentsArr[i].classList.add('active');
            } else {
                h.classList.remove('active');
                contentsArr[i].classList.remove('active');
            }
        });
    });
});




