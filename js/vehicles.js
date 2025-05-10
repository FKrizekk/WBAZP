import { supabase } from './supabase.js';
// https://chatgpt.com/share/681f63ce-56cc-8012-aa94-7b5e41844d81
const carModal = document.querySelector("#carDetailsModal");
const { data: cars, error } = await supabase
  .from('vehicles')
  .select('*')
  .order('created_at', { ascending: false });  // newest first
if (error) throw error;
const profilePromises = cars.map(car =>
  supabase
    .from('profiles')
    .select('username')
    .eq('id', car.user_id)
    .single()
    .then(res => res.data.username)
);

const usernames = await Promise.all(profilePromises);

cars.forEach((car, i) => {
  const username = usernames[i];
  const vehicleCard = new VehicleCard(username, car.name, car.year, car.image_url);
  const panel = document.querySelector("#carPanel");
  vehicleCard.addEventListener("click", () => {
    document.querySelector("#carImage").src = car.image_url;
    document.querySelector("#carName").innerText = car.name;
    document.querySelector("#carYear").innerText = `Rok výroby: ${car.year}`;
    document.querySelector("#carDescription").innerText = `${car.description}`;
    document.querySelector("#carOwner").innerHTML = `Majitel: <a href=./user.html?id=${car.user_id}>${username}</a>`;
    carModal.style.display = "flex";
  });
  panel.appendChild(vehicleCard);
});



document.querySelector(".closeModal").addEventListener("click", () => {
  carModal.style.display = "none";
});