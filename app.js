window.addEventListener("scroll", function () {
    const navbar = document.getElementById("header-middle");
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > 0) {
        navbar.classList.add("header-middle-fixed");
    } else {
        navbar.classList.remove("header-middle-fixed");
    }
});