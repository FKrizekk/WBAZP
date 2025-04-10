const url = "https://wbazpbackend.onrender.com";
let imgs = [];

fetch(url + "/get-images")
    .then(response => response.json())
    .then(images => {
        imgs = images;
        for (let i = 0; i < images.length; i++) {
            const imgElement = document.createElement('div');
            imgElement.style.backgroundImage = `url(${url + imgs[i]})`;
            imgElement.style.setProperty('--animate-delay', `${i * 0.1}s`);
            imgElement.classList = 'imageCard animate__fadeIn animate__animated';
            imgElement.addEventListener('click', () => openImage(i));
            document.querySelector('#gallery').appendChild(imgElement);
        }
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.display = 'none';
        }
    })
    .catch(error => {
        console.error('Error fetching images:', error);
    });


let modal = document.createElement('div');
modal.className = 'modal';
document.body.appendChild(modal);
modal.addEventListener('click', closeModal);
function openImage(imgIndex) {
    if(imgIndex < 0){
        imgIndex = imgs.length - 1;
    }else if(imgIndex >= imgs.length){
        imgIndex = 0;
    }
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modalBtn" onclick="openImage(${imgIndex-1});event.stopPropagation();"><i class="fa-solid fa-arrow-left"></i></span>
            <img class="modalImg" onclick="event.stopPropagation();" src="${url}${imgs[imgIndex]}" alt="Image"/>
            <span class="modalBtn" onclick="openImage(${imgIndex+1});event.stopPropagation();"><i class="fa-solid fa-arrow-right"></i></span>
        </div>
    `;
    modal.style.display = 'flex';
}

function closeModal(){
    modal.style.display = 'none';
    modal.innerHTML = '';
}