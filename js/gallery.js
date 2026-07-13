/* ==========================================================
   ГРАНЬ
   gallery.js
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("galleryGrid");
  const cards = document.querySelectorAll(".gallery-card");

  const modal = document.getElementById("galleryModal");
  const modalImg = document.getElementById("galleryModalImg");
  const modalCaption = document.getElementById("galleryModalCaption");
  const closeBtn = document.getElementById("closeGalleryModal");

  const clickSound = document.getElementById("clickSound");

  /* ---------- звук клика ---------- */

  function playClick() {
    if (!clickSound) return;
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {
      /* автоплей мог быть заблокирован браузером — молча игнорируем */
    });
  }

  /* ---------- плавное появление карточек ---------- */

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("gallery-card--visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  cards.forEach((card, i) => {
    card.style.setProperty("--delay", `${i * 60}ms`);
    revealObserver.observe(card);
  });

  /* ---------- открытие модального окна ---------- */

  function openModal(card) {
    const src = card.dataset.src;
    const caption = card.dataset.caption || "";

    modalImg.src = src;
    modalImg.alt = caption;
    modalCaption.textContent = caption;

    modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    playClick();
  }

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
    modalImg.src = "";
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => openModal(card));
  });

  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      closeModal();
    }
  });

  /* ---------- обработка отсутствующих изображений ---------- */
  /* пока реальные файлы не подложены в assets/img/gallery/,
     показываем плейсхолдер вместо разорванной картинки */

  document.querySelectorAll(".gallery-thumb img").forEach((img) => {
    img.addEventListener("error", () => {
      img.closest(".gallery-thumb").classList.add("gallery-thumb--missing");
    });
  });
});
