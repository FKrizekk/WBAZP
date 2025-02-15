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