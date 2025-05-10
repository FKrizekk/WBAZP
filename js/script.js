class Header extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<div id="header">
            <section>
                <h1>USA VANS CLUB</h1>
            </section>
            <section id="desktopNav">
                <nav>
                    <a class="button" href='./'>Úvod</a>
                    <a class="button" href='./club.html'>Klub</a>
                    <a class="button" href='./vehicles.html'>Naše vozidla</a>
                    <a class="button" href='./articles.html'>Články</a>
                    <a class="button" href='./gallery.html'>Galerie</a>
                    <a class="button" href='./calendar.html'>Kalendář akcí</a>
                    <a class="button" href='./links.html'>Odkazy</a>
                </nav>
                <div class="vertDiv"></div>
                <section class="loginSection">
                    <a class="button" href='./login.html?type=login'>Přihlásit</a>
                    <a class="button special" href='./login.html?type=register'>Registrovat</a>
                </section>
            </section>
            <section id="iconNav">
                <nav>
                    <a class="button" title="Úvod" href='./'><i class="fa-solid fa-house"></i></a>
                    <a class="button" title="Klub" href='./club.html'><i class="fa-solid fa-users"></i></a>
                    <a class="button" title="Naše vozidla" href='./vehicles.html'><i class="fa-solid fa-car"></i></a>
                    <a class="button" title="Články" href='./articles.html'><i class="fa-solid fa-newspaper"></i></a>
                    <a class="button" title="Galerie" href='./gallery.html'><i class="fa-solid fa-image"></i></a>
                    <a class="button" title="Kalendář akcí" href='./calendar.html'><i class="fa-solid fa-calendar-days"></i></a>
                    <a class="button" title="Odkazy" href='./links.html'><i class="fa-solid fa-link"></i></a>
                    <a class="button" title="Uživatel" href='./login.html'><i class="fa-solid fa-user"></i></a>
                </nav>
            </section>
            <section id="mobileNav">
                <button class="mobileMenuButton" onclick="toggleMobileMenu()">
                    <i class="fa-solid fa-bars"></i>
                </button>
            </section>
        </div>
        `;
    }
}
customElements.define('custom-header', Header);


class MobileMenu extends HTMLElement {
    constructor() {
        super();
        this.id = "mobileMenu";
        this.innerHTML = `
        <div id="mobileMenuContent">
            <nav>
                <a class="button" href='./'>Úvod</a>
                <a class="button" href='./club.html'>Klub</a>
                <a class="button" href='./vehicles.html'>Naše vozidla</a>
                <a class="button" href='./articles.html'>Články</a>
                <a class="button" href='./gallery.html'>Galerie</a>
                <a class="button" href='./calendar.html'>Kalendář akcí</a>
                <a class="button" href='./links.html'>Odkazy</a>
            </nav>
            <section class="loginSection">
                <a class="button" href='./login.html?type=login'>Přihlásit</a>
                <a class="button special" href='./login.html?type=register' class="special">Registrovat</a>
            </section>
        </div>`;
    }

    connectedCallback() {
        setTimeout(() => {
            this.style.transition = "all 0.1s ease-out";
        }, 500);
    }
}
customElements.define('mobile-menu', MobileMenu);

class VehicleCard extends HTMLElement {
    constructor(owner, name, year, image) {
        super();
        this.innerHTML = `
            <div class="vehicleCardInfo">
                <h4>${name}</h4>
                <p>Majitel: ${owner}</p>
                <p>Rok výroby: ${year}</p>
            </div>`;
        this.classList.add("vehicleCard");
        this.style.backgroundImage = `url(${image})`;
    }
}
customElements.define('vehicle-card', VehicleCard);

class Loader extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <svg viewBox="25 25 50 50" class="loader">
            <circle r="20" cy="50" cx="50"></circle>
        </svg>`;
    }
}
customElements.define('loader-element', Loader);


let buttons = document.querySelectorAll("a.button");
buttons.forEach(button => {
    if(button.href === location.href) {
        button.classList.add("selected");
    }
    if(button.href.includes("/login.html") && location.href.includes("/profile.html")) {
        button.classList.add("selected");
    }
});

document.querySelector('h1').addEventListener('click', () => {
    location.href = './';
});

function toggleMobileMenu(){
    const mobileMenu = document.getElementById('mobileMenu');

    mobileMenu.style.transform = mobileMenu.style.transform === "translateX(0px)" ? "translateX(100%)" : "translateX(0px)";
}


document.querySelectorAll('.modal-content').forEach(modal => { 
    modal.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', () => {
        modal.style.display = "none";
    });
});