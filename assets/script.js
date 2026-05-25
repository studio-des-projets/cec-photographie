/* ---------- Année du pied de page ---------- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- Menu mobile ---------- */
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  nav.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => nav.classList.remove("open"))
  );
}

/* ---------- Galerie d'une série + visionneuse ---------- */
const gallery = document.getElementById("gallery");
if (gallery && typeof PHOTOS !== "undefined") {
  const serie = gallery.dataset.serie;
  const photos = PHOTOS.filter(p => !serie || p.categorie === serie);
  let current = 0;

  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lb-img");
  const lbCaption = document.getElementById("lb-caption");
  const lbCounter = document.getElementById("lb-counter");
  const lbTexte = document.getElementById("lb-texte");

  photos.forEach((p, i) => {
    const item = document.createElement("figure");
    item.className = "gallery-item";
    const img = document.createElement("img");
    img.src = "thumbs/" + p.fichier;
    img.alt = p.titre;
    img.loading = "lazy";
    const markLoaded = () => item.classList.add("loaded");
    if (img.complete) markLoaded(); else img.addEventListener("load", markLoaded);
    const cap = document.createElement("figcaption");
    cap.className = "cap";
    cap.textContent = p.titre;
    item.append(img, cap);
    item.addEventListener("click", () => openLightbox(i));
    gallery.appendChild(item);
    setTimeout(() => item.classList.add("in"), 60 * Math.min(i, 12));
  });

  function show(i) {
    current = (i + photos.length) % photos.length;
    const p = photos[current];
    lbImg.src = "images/" + p.fichier;
    lbImg.alt = p.titre;
    lbCaption.textContent = p.titre;
    lbTexte.textContent = p.texte || "";
    lbCounter.textContent = (current + 1) + " / " + photos.length;
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
}

/* ---------- Page « Bientôt » : nom de la série depuis l'URL ---------- */
const soonName = document.getElementById("soon-serie");
if (soonName) {
  const params = new URLSearchParams(window.location.search);
  const s = params.get("serie");
  if (s) soonName.textContent = "« " + s + " »";
}

/* ---------- Citations rotatives (page Accueil) ---------- */
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
  }, 4500);
}

/* ---------- Apparition au scroll ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

/* ---------- Formulaire de contact ---------- */
const form = document.getElementById("contact-form");
if (form) {
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
      } else { throw new Error(); }
    } catch {
      status.textContent = "Une erreur est survenue. Réessayez plus tard.";
      status.className = "form-status err";
    }
  });
}

/* ---------- Bouton « retour en haut » ---------- */
const toTop = document.createElement("button");
toTop.className = "to-top";
toTop.setAttribute("aria-label", "Retour en haut");
toTop.innerHTML = "&#8593;";
document.body.appendChild(toTop);
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ---------- En-tête réduit + parallaxe + bouton (au scroll) ---------- */
const header = document.querySelector(".site-header");
const cbImg = document.querySelector(".cb-img");
function onScroll() {
  const y = window.scrollY;
  if (header) header.classList.toggle("scrolled", y > 40);
  toTop.classList.toggle("show", y > 600);
  if (cbImg) cbImg.style.transform = "translateY(" + (y * 0.18) + "px)";
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- Transition douce entre les pages ---------- */
document.querySelectorAll('a[href]').forEach(a => {
  const href = a.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("http") ||
      href.startsWith("mailto:") || a.target === "_blank") return;
  a.addEventListener("click", e => {
    e.preventDefault();
    document.body.classList.add("is-leaving");
    setTimeout(() => { window.location.href = href; }, 320);
  });
});
