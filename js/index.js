import { supabase } from './supabase.js';


const profiles = await supabase
    .from('profiles')
    .select('id, username')
    .order('created_at', { ascending: false })
    .limit(5);
if (profiles.error) throw profiles.error;


const profileContainer = document.querySelector("#memberPanel");
profiles.data.forEach((profile) => {
    const profileCard = document.createElement("a");
    profileCard.setAttribute("href", `./user.html?id=${profile.id}`);
    profileCard.innerText = profile.username;
    profileContainer.appendChild(profileCard);
});


const photoContainer = document.querySelector("#photoContainer");

const { data: photos, error } = await supabase
  .storage
  .from('gallery')
  .list('', { limit: 3, sortBy: { column: 'created_at', order: 'desc' } });

if (error) throw error;

photos.forEach(photo => {
  const { data: publicUrlData } = supabase
    .storage
    .from('gallery')
    .getPublicUrl(photo.name);

  const photoCard = document.createElement("div");
  photoCard.style.backgroundImage = `url(${publicUrlData.publicUrl})`;
  photoContainer.appendChild(photoCard);
});
