const params = new URLSearchParams(window.location.search);

loginType = params.get("type");
if(loginType === null){
    loginType = "register";
}


document.getElementById("loginArticle").style.display = loginType === "login" ? "block" : "none";
document.getElementById("registerArticle").style.display = loginType === "register" ? "block" : "none";



