/* =====================================================
    ГРАНЬ
    app.js
===================================================== */

const CORRECT_EMAIL = "artem@gmail.com";

const loader = document.getElementById("loader");
const loaderBar = document.getElementById("loaderBar");
const loaderText = document.getElementById("loaderText");

const mainSite = document.getElementById("mainSite");

const subscribeForm = document.getElementById("subscribeForm");
const emailInput = document.getElementById("emailInput");

const candidateModal = document.getElementById("candidateModal");

const candidateText = document.getElementById("candidateText");

const acceptButton = document.getElementById("acceptButton");
const declineButton = document.getElementById("declineButton");

const ambience = document.getElementById("ambience");
const clickSound = document.getElementById("clickSound");
const successSound = document.getElementById("successSound");

/* =====================================================
                    ЗАГРУЗКА
===================================================== */

mainSite.style.display = "none";

const loadingMessages = [
  "Инициализация системы...",
  "Подключение защищённого канала...",
  "Проверка доступа...",
  "Сканирование базы данных...",
  "Синхронизация...",
  "Готово.",
];

let progress = 0;
let textIndex = 0;

const loading = setInterval(() => {
  progress++;

  loaderBar.style.width = progress + "%";

  if (progress % 18 === 0 && textIndex < loadingMessages.length - 1) {
    textIndex++;
    loaderText.textContent = loadingMessages[textIndex];
  }

  if (progress >= 100) {
    clearInterval(loading);

    setTimeout(() => {
      loader.style.display = "none";
      mainSite.style.display = "block";
    }, 600);
  }
}, 35);

/* =====================================================
                ПЛАВНОЕ ПОЯВЛЕНИЕ
===================================================== */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.2,
  },
);

document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

/* =====================================================
            МУЗЫКА ПО ПЕРВОМУ КЛИКУ
===================================================== */

document.body.addEventListener(
  "click",
  () => {
    ambience.volume = 0.15;

    ambience.play().catch(() => {});
  },
  {
    once: true,
  },
);

/* =====================================================
                ФОРМА
===================================================== */

subscribeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  clickSound.play();

  const email = emailInput.value.trim().toLowerCase();

  if (email !== CORRECT_EMAIL.toLowerCase()) {
    shake(emailInput);

    alert("Подписка оформлена.");

    return;
  }

  fakeVerification();
});

/* =====================================================
            ПРОВЕРКА
===================================================== */

function fakeVerification() {
  candidateModal.style.display = "flex";

  candidateText.innerHTML = `
    Выполняется поиск совпадений...
    `;

  setTimeout(() => {
    candidateText.innerHTML = `
        Проверка личности...<br><br>

        Совпадение найдено.<br><br>

        <strong>
        Князев Артём Игоревич?
        </strong>

        <br><br>

        Кандидат на должность
        оперативного агента организации
        <strong>ГРАНЬ</strong>.

        <br><br>

        Причина приглашения:

        <br><br>

        • возраст — 19 лет

        <br>

        • высокий уровень наблюдательности

        <br>

        • нестандартное мышление

        <br><br>

        Принять приглашение?
        `;
  }, 1700);
}

/* =====================================================
                ОТКАЗ
===================================================== */

declineButton.addEventListener("click", () => {
  clickSound.play();

  candidateText.innerHTML = `
    Запрос отклонён...

    <br><br>

    Мы уважаем ваше решение.
    `;

  setTimeout(() => {
    candidateText.innerHTML += `

        <br><br>

        <strong>

        Нет.

        </strong>

        `;

    declineButton.style.display = "none";
  }, 2500);
});

/* =====================================================
                ПРИНЯТИЕ
===================================================== */

acceptButton.addEventListener("click", () => {
  successSound.play();

  candidateText.innerHTML = `

    <strong>

    Добро пожаловать.

    </strong>

    <br><br>

    Уровень допуска Δ-0 выдан.

    <br><br>

    Открытие первого испытания...

    `;

  acceptButton.style.display = "none";
  declineButton.style.display = "none";

  setTimeout(() => {
    document.body.style.opacity = "0";
  }, 2800);

  setTimeout(() => {
    window.location.href = "desk.html";
  }, 4200);
});

/* =====================================================
                SHAKE
===================================================== */

function shake(element) {
  element.animate(
    [
      { transform: "translateX(0px)" },
      { transform: "translateX(-10px)" },
      { transform: "translateX(10px)" },
      { transform: "translateX(-10px)" },
      { transform: "translateX(10px)" },
      { transform: "translateX(0px)" },
    ],
    {
      duration: 350,
    },
  );
}

/* =====================================================
        ПАСХАЛКА
===================================================== */

console.log(
  "%cОРГАНИЗАЦИЯ ГРАНЬ",
  "color:#46E6D2;font-size:20px;font-weight:bold;",
);

console.log(
  "%cЕсли вы читаете это сообщение — значит, любопытство является одной из ваших сильных сторон.",
  "color:white;",
);

console.log("%cМы ценим подобных людей.", "color:#46E6D2;");
