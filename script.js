if(document.documentElement.getAttribute('data-theme') === null){
    document.documentElement.setAttribute('data-theme', 'light');
}
function toggleTheme(){
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); // Save theme
}
if(localStorage.getItem('theme') === 'dark'){
    toggleTheme();
}


function toggleMobileMenu(){
    const mobileMenu = document.getElementById('mobileMenu');

    mobileMenu.style.transform = mobileMenu.style.transform === "translateX(0px)" ? "translateX(100%)" : "translateX(0px)";
}