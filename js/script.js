const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

menuToggle?.addEventListener("click", () => {
  const opened = menu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", opened);
});

document.querySelectorAll(".menu a").forEach(link => {
  link.addEventListener("click", () => {
    menu?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

/*
  GALERIA:
  Coloque suas imagens em assets/fotos/ e altere os caminhos abaixo.
  Exemplo:
  const photos = [
    "assets/fotos/cookie-01.jpg",
    "assets/fotos/cookie-02.jpg",
    ...
  ];
*/
const photos = [
    "./assets/images/DSC03477.JPG", // 0
    "./assets/images/DSC03455.JPG", // 1
    "./assets/images/DSC03479.JPG", // 2
    "./assets/images/DSC03448.JPG", // 3
    "./assets/images/DSC03445.JPG", // 4
    "./assets/images/DSC03440.JPG", // 5
    "./assets/images/DSC03447.JPG", // 6
    "./assets/images/DSC03449.JPG", // 7
    "./assets/images/DSC03470.JPG", // 8
    "./assets/images/DSC03469.JPG", // 9
    "./assets/images/DSC03467.JPG", // 10
    "./assets/images/DSC03442.JPG"  // 11
];

const items = [...document.querySelectorAll(".gallery-item")];

const lightbox = document.querySelector(".lightbox");
const lightboxContent = document.querySelector(".lightbox-content");

let current = 0;

function renderPhoto(index) {
    current = (index + photos.length) % photos.length;

    const src = photos[current];

    if (src) {
        lightboxContent.innerHTML = `
            <img
                src="${src}"
                alt="Foto da galeria"
                style="
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    border-radius: 20px;
                "
            >
        `;
    }
}

items.forEach((item, index) => {

    const img = item.querySelector(".photo-placeholder img");

    if (img && photos[index]) {
        img.src = photos[index];
    }

    item.addEventListener("click", () => {
        renderPhoto(index);

        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
    });
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
}

document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
document.querySelector(".lightbox-prev").addEventListener("click", () => renderPhoto(current - 1));
document.querySelector(".lightbox-next").addEventListener("click", () => renderPhoto(current + 1));

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", event => {
  if (!lightbox.classList.contains("open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") renderPhoto(current - 1);
  if (event.key === "ArrowRight") renderPhoto(current + 1);
});

// Entrada suave dos elementos na tela.
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
