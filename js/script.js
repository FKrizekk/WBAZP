document.querySelector('h1').addEventListener('click', () => {
    location.href = './';
});

function toggleMobileMenu(){
    const mobileMenu = document.getElementById('mobileMenu');

    mobileMenu.style.transform = mobileMenu.style.transform === "translateX(0px)" ? "translateX(100%)" : "translateX(0px)";
}

