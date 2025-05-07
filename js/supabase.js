import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
    
const supabaseUrl = 'https://glpxjoolzgsorebqkfrk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdscHhqb29semdzb3JlYnFrZnJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MjYzMTEsImV4cCI6MjA2MTAwMjMxMX0.Md8JoGfIp6ayhHEntdsnVCTb-K7mzjP8-kUNnhKDEGY';
window.supabase = createClient(supabaseUrl, supabaseAnonKey);



const { data: { session } } = await supabase.auth.getSession();
if (session) {
    // User is logged in
    console.log("User is logged in");
    login();
} else {
    // User is not logged in
    console.log("User is not logged in");
    logout();

}

supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
        // User is logged in
        console.log("User logged in");
        login();
    } else {
        // User is logged out
        console.log("User logged out");
        logout();
    }
});
  


function login() {
    let buttons = document.querySelectorAll(".loginSection button")
    buttons[0].innerText = "Profil";
    buttons[1].innerText = "Odhlásit se";
    buttons[0].onclick = () => {
        location.href = "./profile.html";
    }
    buttons[1].onclick = () => {
        supabase.auth.signOut()
            .then(() => {
                location.href = "./index.html";
            })
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    }
}

function logout() {
    let buttons = document.querySelectorAll(".loginSection button")
    buttons[0].innerText = "Přihlásit se";
    buttons[1].innerText = "Registrovat se";
    buttons[0].onclick = () => {
        location.href = "./login.html?type=login";
    }
    buttons[1].onclick = () => {
        location.href = "./login.html?type=register";
    }
}