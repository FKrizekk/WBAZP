const { data: vehicles, error: uerror } = await window.supabase
  .from('vehicles')
  .select('*');

vehicles.forEach(car => {
    document.querySelector("#carPanel").appendChild(new VehicleCard(car.user_id, car.name, car.year));
});