const accordionArr = Array.from(document.querySelectorAll('.accordion'));
accordionArr.forEach((accordion, index) => {
    accordion.addEventListener('click', () => {
        accordionArr.forEach((a, i) => {
            if (i == index) {
                a.children[0].classList.toggle('active');
                a.children[1].classList.toggle('d-none');
            }else{
                a.children[0].classList.remove('active');
                a.children[1].classList.add('d-none');
            }
        });
    })
});