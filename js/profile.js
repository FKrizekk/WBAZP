import { supabase } from "supabase.js";

supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
        const user = session.user;
        const email = user.email;
        const username = user.user_metadata.username;

        document.querySelector('#username').innerText = `${username}`;
        document.querySelector('#email').innerText = `${email}`;
    } else {
        window.location.href = './login.html?type=login';
    }
});

document.querySelector("#signoutButton").addEventListener("click", async () => {
    const { error: signOutErr } = await supabase.auth.signOut();
    if (signOutErr) {
        alert("Odhlášení selhalo: " + signOutErr.message);
    } else {
        alert("Odhlášení proběhlo úspěšně。");
        window.location.href = './login.html?type=login';
    }
});

const addCarModal = document.querySelector("#addCarModal");
const carModal = document.querySelector("#carDetailsModal");
document.querySelector("#addCar").addEventListener("click", () => {
    addCarModal.style.display = "flex";
    document.querySelector("#addCarForm").reset();
});
document.querySelectorAll(".closeModal").forEach((el) => {
    el.addEventListener("click", () => {
        addCarModal.style.display = "none";
        carModal.style.display = "none";
    });
});

document
    .querySelector("#addCarForm")
    .addEventListener("submit", async (e) => {
        e.preventDefault();

        // 1) Grab form values
        const name = document.querySelector("#carName").value;
        const year = document.querySelector("#carYear").value;
        const description = document.querySelector("#carDescription").value;
        const fileInput = document.querySelector("#carImage");
        const file = fileInput.files[0];

        // 2) Ensure user is signed in
        const { data: { user }, error: authErr } = await supabase.auth.getUser();
        if (authErr || !user) {
            return alert("Problém s přihlášením: " + authErr.message);
        }

        // 3) Upload
        const ext = file.name.split(".").pop();
        const path = `${user.id}-${Date.now()}.${ext}`;
        const { error: uploadErr } = await supabase
            .storage
            .from("vehicles")
            .upload(path, file);
        if (uploadErr) {
            return alert("Chyba při nahrávání obrázku: " + uploadErr.message);
        }

        // 4) Get URL
        const { data: urlData, error: urlErr } = await supabase
            .storage
            .from("vehicles")
            .getPublicUrl(path);
        if (urlErr) {
            return alert("Chyba při získávání URL obrázku: " + urlErr.message);
        }
        const imageUrl = urlData.publicUrl;

        // 5) Insert into DB
        const { data, error: insertErr } = await supabase
            .from("vehicles")
            .insert([{
                user_id: user.id,
                name: name,
                year: year,
                description: description,
                image_url: imageUrl
            }]);
        if (insertErr) {
            console.error(insertErr);
            return alert("Chyba při nahrávání do databáze: " + insertErr.message);
        }

        alert("Úspěšně přidáno vozidlo!");
        addCarModal.style.display = "none";
        console.log(data);
    });



const { data: { user }, error: authErr } = await supabase.auth.getUser();
if (authErr || !user) {
    console.error("Auth error: ", authErr);
}

await supabase.from("vehicles").select("*").eq("user_id", user.id).then(({ data, error }) => {
    if (error) {
        console.error("Chyba při načítání vozidel:", error);
    }

    data.forEach(async car => {
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', car.user_id)
        .single();
      const vehicleCard = new VehicleCard(data.username, car.name, car.year, car.image_url);
      const panel = document.querySelector("#profileCarPanel");
      vehicleCard.addEventListener("click", () => {
        document.querySelector("#carDetailsModal #carImage").src = car.image_url;
        document.querySelector("#carDetailsModal #carName").innerText = car.name;
        document.querySelector("#carDetailsModal #carYear").innerText = `Rok výroby: ${car.year}`;
        document.querySelector("#carDetailsModal #carDescription").innerText = `${car.description}`;
        document.querySelector("#carDetailsModal #carOwner").innerHTML = `Majitel: <a href=./users?user=${data.username}>${data.username}</a>`;
        carModal.style.display = "flex";
      });
      panel.appendChild(vehicleCard);
    });
});