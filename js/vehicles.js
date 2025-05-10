import { supabase } from './supabase.js';

const carModal = document.querySelector("#carDetailsModal");
await supabase.from("vehicles").select("*").then(({ data, error }) => {
    if (error) {
        console.error("Chyba při načítání vozidel:", error);
        return;
    }

    data.forEach(async car => {
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', car.user_id)
        .single();
      const vehicleCard = new VehicleCard(data.username, car.name, car.year, car.image_url);
      const panel = document.querySelector("#carPanel");
      vehicleCard.addEventListener("click", () => {
        document.querySelector("#carImage").src = car.image_url;
        document.querySelector("#carName").innerText = car.name;
        document.querySelector("#carYear").innerText = `Rok výroby: ${car.year}`;
        document.querySelector("#carDescription").innerText = `${car.description}`;
        document.querySelector("#carOwner").innerHTML = `Majitel: <a href=./user.html?id=${car.user_id}>${data.username}</a>`;
        carModal.style.display = "flex";
      });
      panel.appendChild(vehicleCard);
    });
});



document.querySelector(".closeModal").addEventListener("click", () => {
  carModal.style.display = "none";
});