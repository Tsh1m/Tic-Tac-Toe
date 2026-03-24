let btn = document.querySelector(".l-mode");
let ld = 0;

btn.addEventListener("click", (e) => {
    console.log("hello");
    ld += 1;
    ld %= 2;

    if (ld) {
        btn.innerHTML = "light-mode";
        document.body.style.colorScheme = "dark";
    } else {
        btn.innerHTML = "light";
        document.body.style.colorScheme = "dark-mode";
    }
});
