import { supabase } from "./supabase.js";
window.imgs = [];

const { data: photos, error } = await supabase
  .storage
  .from('gallery')
  .list('', { sortBy: { column: 'created_at', order: 'desc' } });

if (error) throw error;

photos.forEach((photo, i) => {
  const { data: publicUrlData } = supabase
    .storage
    .from('gallery')
    .getPublicUrl(photo.name);
    
    imgs.push(publicUrlData.publicUrl);
    const imgElement = document.createElement('div');
    imgElement.style.backgroundImage = `url(${publicUrlData.publicUrl})`;
    imgElement.style.setProperty('--animate-delay', `${i * 0.1}s`);
    imgElement.classList = 'imageCard animate__fadeIn animate__animated';
    imgElement.addEventListener('click', () => openImage(i));
    document.querySelector('#gallery').appendChild(imgElement);
});


