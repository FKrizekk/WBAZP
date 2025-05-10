import { supabase } from "./supabase.js";




const carModal = document.querySelector("#carDetailsModal");

document.querySelectorAll(".closeModal").forEach((el) => {
    el.addEventListener("click", () => {
        carModal.style.display = "none";
    });
});


const user_id = new URLSearchParams(window.location.search).get("id");

await supabase.from("vehicles").select("*").eq("user_id", user_id).then(({ data, error }) => {
    if (error) {
        console.error("Chyba při načítání vozidel:", error);
    }

    data.forEach(async car => {
        const { data, error } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', user_id)
            .single();
        const vehicleCard = new VehicleCard(data.username, car.name, car.year, car.image_url);
        const panel = document.querySelector("#profileCarPanel");
        vehicleCard.addEventListener("click", () => {
            document.querySelector("#carDetailsModal #carImage").src = car.image_url;
            document.querySelector("#carDetailsModal #carName").innerText = car.name;
            document.querySelector("#carDetailsModal #carYear").innerText = `Rok výroby: ${car.year}`;
            document.querySelector("#carDetailsModal #carDescription").innerText = `${car.description}`;
            document.querySelector("#carDetailsModal #carOwner").innerHTML = `Majitel: <a href=./user.html?id=${car.user_id}>${data.username}</a>`;
            carModal.style.display = "flex";
        });
        panel.appendChild(vehicleCard);
    });
});





let { data: profile, profileErr } = await supabase
    .from('profiles')
    .select('avatar_url, bio')
    .eq('id', user_id)
    .single();

if (profileErr) {
    console.error("Chyba při načítání profilu:", profileErr);
}
document.querySelector("#avatar").src = profile.avatar_url;
document.querySelector("#bio").innerText = profile.bio;