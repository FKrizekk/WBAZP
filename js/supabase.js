import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
    
const supabaseUrl = 'https://glpxjoolzgsorebqkfrk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdscHhqb29semdzb3JlYnFrZnJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MjYzMTEsImV4cCI6MjA2MTAwMjMxMX0.Md8JoGfIp6ayhHEntdsnVCTb-K7mzjP8-kUNnhKDEGY';
window.supabase = window.supabaseSession || createClient(supabaseUrl, supabaseAnonKey);

(async () => {
    const {
        data: { session },
        error
    } = await window.supabase.auth.getSession();

    if (error) {
        console.error('Session error:', error.message);
    } else {
        window.supabaseSession = session;
    }
})();

window.supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth state changed:', event, session);
    if (session) {
        login();
    } else {
        logout();
    }
});
  


function login() {
    let buttons = document.querySelectorAll(".loginSection a.button")
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
    let buttons = document.querySelectorAll(".loginSection a.button")
    buttons[0].innerText = "Přihlásit se";
    buttons[1].innerText = "Registrovat se";
    buttons[0].onclick = () => {
        location.href = "./login.html?type=login";
    }
    buttons[1].onclick = () => {
        location.href = "./login.html?type=register";
    }
}