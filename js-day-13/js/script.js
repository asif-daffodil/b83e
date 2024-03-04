const tabHeaders = document.querySelectorAll(".tab-headers")[0];
const tabHeadersChildren = tabHeaders.children;
const tabHeadersArr = Array.from(tabHeadersChildren);

const tabDetails = document.querySelectorAll(".tab-details")[0];
const tabDetailsChildren = tabDetails.children;
const tabDetailsArr = Array.from(tabDetailsChildren);

tabHeadersArr.map(child => {
    child.addEventListener("click", () => {
        let ind = tabHeadersArr.indexOf(child);

        tabHeadersArr.map((c, i) => {
            if (i === ind) {
                c.classList.add("active");
                tabDetailsArr[i].classList.remove("d-none");
            } else {
                c.classList.remove("active");
                tabDetailsArr[i].classList.add("d-none");
            }
        });
    });
})
