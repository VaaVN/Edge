/*==================================================
        ГРАНЬ
        Архив данных Ω-07
==================================================*/

const files = document.querySelectorAll(".file-card");

const fileModal = document.getElementById("fileModal");

const fileTitle = document.getElementById("fileTitle");

const fileText = document.getElementById("fileText");

const closeFile = document.getElementById("closeFile");

const passwordParts = document.getElementById("passwordParts");

const passwordInput = document.getElementById("passwordInput");

const checkPassword = document.getElementById("checkPassword");

const successModal = document.getElementById("successModal");

const continueButton = document.getElementById("continueButton");

let collectedParts = [];

/*==================================================
        ДАННЫЕ АРХИВА
==================================================*/

const archiveData = {
  bigboss: {
    title: "BIG BOSS — Личное дело",

    text: `

Объект: неизвестен.

Статус:
легендарный оперативник.

В отчётах отмечается невероятная
выдержка агента и способность
выживать в невозможных условиях.

Кодовое обозначение объекта:

<span class="secretWord" data-word="ТЕНЬ">

ТЕНЬ

</span>

`,
  },

  dante: {
    title: "DANTE — Отчёт охотника",

    text: `

Объект обладает высокой скоростью
реакции и уникальными боевыми
способностями.

Исследователи отмечают его
способность использовать силу,
которая выходит за пределы
обычных человеческих возможностей.

Ключевой термин:

<span class="secretWord" data-word="СЫН">

СЫН

</span>

`,
  },

  vergil: {
    title: "VERGIL — Анализ объекта",

    text: `

Объект стремится к абсолютной
силе и контролю.

Его стиль боя основан на
точности, дисциплине и холодном
расчёте.

Основной параметр:

<span class="secretWord" data-word="СИЛА">

СИЛА

</span>

`,
  },

  leon: {
    title: "LEON KENNEDY — Оперативный отчёт",

    text: `

Агент прошёл многочисленные
кризисные ситуации.

Отмечена высокая адаптация
и выполнение заданий даже
при критических условиях.

Уровень допуска:

<span class="secretWord" data-word="АГЕНТ">

АГЕНТ

</span>

`,
  },
};

/*==================================================
        ОТКРЫТИЕ ФАЙЛОВ
==================================================*/

files.forEach((file) => {
  file.addEventListener("click", () => {
    let id = file.dataset.file;

    fileTitle.innerHTML = archiveData[id].title;

    fileText.innerHTML = archiveData[id].text;

    fileModal.style.display = "flex";

    activateSecretWords();
  });
});

/*==================================================
        ЗАКРЫТИЕ
==================================================*/

closeFile.addEventListener("click", () => {
  fileModal.style.display = "none";
});

/*==================================================
        СЕКРЕТНЫЕ СЛОВА
==================================================*/

function activateSecretWords() {
  const words = document.querySelectorAll(".secretWord");

  words.forEach((word) => {
    word.addEventListener("click", () => {
      let value = word.dataset.word;

      collectPart(value);

      word.style.color = "#46E6D2";
    });
  });
}

function collectPart(word) {
  if (collectedParts.includes(word)) return;

  collectedParts.push(word);

  updatePassword();
}

function updatePassword() {
  passwordParts.innerHTML = collectedParts.map(() => "█").join(" ");
}

/*==================================================
        ПРОВЕРКА ПАРОЛЯ
==================================================*/

checkPassword.addEventListener("click", () => {
  let answer = passwordInput.value.trim().toUpperCase();

  let correct = "ТЕНЬ_СЫН_СИЛА_АГЕНТ";

  if (answer === correct) {
    successModal.style.display = "flex";
  } else {
    passwordInput.animate(
      [
        {
          transform: "translateX(0)",
        },
        {
          transform: "translateX(-10px)",
        },
        {
          transform: "translateX(10px)",
        },
        {
          transform: "translateX(0)",
        },
      ],
      {
        duration: 300,
      },
    );
  }
});

/*==================================================
        ПЕРЕХОД
==================================================*/

continueButton.addEventListener("click", () => {
  document.body.style.opacity = "0";

  setTimeout(() => {
    window.location.href = "gallery.html";
  }, 1200);
});

console.log("%cАРХИВ ГРАНЬ Ω-07", "color:#46E6D2;font-size:18px;");

console.log(
  "%cНекоторые файлы содержат больше информации, чем кажется.",
  "color:white;",
);
