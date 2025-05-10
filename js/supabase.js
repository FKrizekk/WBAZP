import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'
    
const supabaseUrl = 'https://glpxjoolzgsorebqkfrk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdscHhqb29semdzb3JlYnFrZnJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MjYzMTEsImV4cCI6MjA2MTAwMjMxMX0.Md8JoGfIp6ayhHEntdsnVCTb-K7mzjP8-kUNnhKDEGY';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const { data: { session }, error } = await supabase.auth.getSession();


(async () => {
    if (error) {
        console.error('Session error:', error.message);
        logout();
    } else {
        if (session) {
            login();
        } else {
            logout();
        }
    }

    supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth state changed:', event, session);
        if (session) {
            login();
        } else {
            logout();
        }
    });
})();



function login() {
    let buttons = document.querySelectorAll(".loginSection a.button")
    buttons[0].innerText = "Profil";
    buttons[0].href = "./profile.html";
    buttons[1].innerText = "Odhlásit";
    buttons[1].classList.add("signoutButton");
    buttons[1].href = "#";
    buttons[0].onclick = () => {
        location.href = "./profile.html";
    }
    buttons[1].onclick = async () => {
        // grab the up-to-date session object
        const { data: { session }, error: getErr } = await supabase.auth.getSession()
        if (getErr) {
            console.error('Failed to get session', getErr)  // network or storage error
            return
        }
        if (!session) {
            alert("Odhlášení selhalo: Žádná aktivní session nebyla nalezena。")
            return
        }

        const { error: signOutErr } = await supabase.auth.signOut()
        if (signOutErr) {
            alert("Odhlášení selhalo: " + signOutErr.message)
        } else {
            alert("Odhlášení proběhlo úspěšně。")
        }
    }

}

function logout() {
    let buttons = document.querySelectorAll(".loginSection a.button")
    buttons[0].innerText = "Přihlásit";
    buttons[1].innerText = "Registrovat";
    buttons[0].classList.remove("signoutButton");
    buttons[0].onclick = () => {
        location.href = "./login.html?type=login";
    }
    buttons[1].onclick = () => {
        location.href = "./login.html?type=register";
    }
}