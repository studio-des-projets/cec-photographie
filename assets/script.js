document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Menu mobile ---------- */
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => nav.classList.remove("open"))
);

/* ---------- Galerie ---------- */
const gallery = document.getElementById("gallery");
let visibles = [];

function render(filter) {
  visibles = PHOTOS.filter(p => filter === "tous" || p.categorie === filter);
  gallery.innerHTML = "";
  visibles.forEach((p, i) => {
    const item = document.createElement("figure");
    item.className = "gallery-item";
    item.innerHTML =
      `<img src="images/${p.fichier}" alt="${p.titre}" loading="lazy">` +
      `<figcaption class="cap">${p.titre}</figcaption>`;
    item.addEventListener("click", () => openLightbox(i));
    gallery.appendChild(item);
    setTimeout(() => item.classList.add("in"), 60 * Math.min(i, 12));
  });
}

document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    render(btn.dataset.filter);
  });
});

/* ---------- Lightbox ---------- */
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lb-img");
const lbCaption = document.getElementById("lb-caption");
let current = 0;

const lbCounter = document.getElementById("lb-counter");
const lbTexte = document.getElementById("lb-texte");

function show(i) {
  current = (i + visibles.length) % visibles.length;
  const p = visibles[current];
  lbImg.src = "images/" + p.fichier;
  lbImg.alt = p.titre;
  lbCaption.textContent = p.titre;
  lbTexte.textContent = p.texte || "";
  lbCounter.textContent = (current + 1) + " / " + visibles.length;
}
function openLightbox(i) {
  show(i);
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
}

document.querySelector(".lb-close").addEventListener("click", closeLightbox);
document.querySelector(".lb-next").addEventListener("click", () => show(current + 1));
document.querySelector(".lb-prev").addEventListener("click", () => show(current - 1));
lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") show(current + 1);
  if (e.key === "ArrowLeft") show(current - 1);
});

render("tous");

/* ---------- Citations rotatives de l'accueil ---------- */
const CITATIONS = [
  "« Je ne cherche pas la perfection technique. Je cherche une sensation. Une vérité. Une émotion qui reste après le regard. »",
  "« La photographie est une mémoire du vivant — une manière de retenir l'instant de ce qui nous échappe. »",
  "« J'aime révéler la beauté de ce qui ne cherche pas à se montrer : les instants suspendus, les fragilités. »",
  "« Je suis attirée par les atmosphères sincères, les lieux habités, les visages qui vous transpercent le cœur. »",
  "« Cette lumière intérieure que chacun porte en soi, sans toujours le savoir. »",
];
const heroQuote = document.getElementById("hero-quote");
if (heroQuote) {
  let qi = 0;
  setInterval(() => {
    heroQuote.classList.add("fade");
    setTimeout(() => {
      qi = (qi + 1) % CITATIONS.length;
      heroQuote.textContent = CITATIONS[qi];
      heroQuote.classList.remove("fade");
    }, 1100);
  }, 7500);
}

/* ---------- Apparition au scroll ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

/* ---------- Envoi du formulaire de contact ---------- */
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
form.addEventListener("submit", async e => {
  e.preventDefault();
  if (form.action.includes("VOTRE_ID_FORMSPREE")) {
    status.textContent = "Formulaire pas encore activé (voir LISEZ-MOI.md).";
    status.className = "form-status err";
    return;
  }
  status.textContent = "Envoi en cours…";
  status.className = "form-status";
  try {
    const res = await fetch(form.action, {
      method: "POST", body: new FormData(form),
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      form.reset();
      status.textContent = "Merci ! Votre message a bien été envoyé.";
      status.className = "form-status ok";
    } else {
      throw new Error();
    }
  } catch {
    status.textContent = "Une erreur est survenue. Réessayez plus tard.";
    status.className = "form-status err";
  }
});
