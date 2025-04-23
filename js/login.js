const params = new URLSearchParams(window.location.search);

loginType = params.get("type");
if(loginType === null){
    loginType = "login";
}

document.querySelector('h2').innerText = loginType === "login" ? "Příhlášení" : "Registrace";


