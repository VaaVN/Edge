/*==================================================
    ГРАНЬ
    Испытание №2
==================================================*/

const leftConnectors = document.querySelectorAll(".connector.left");
const rightConnectors = document.querySelectorAll(".connector.right");

const svg = document.getElementById("wireCanvas");

const taskText = document.getElementById("taskText");

const successModal = document.getElementById("successModal");
const continueButton = document.getElementById("continueButton");

const connectSound = document.getElementById("connectSound");
const successSound = document.getElementById("successSound");
const errorSound = document.getElementById("errorSound");

successModal.style.display = "none";

let startConnector = null;
let currentLine = null;

let connected = 0;

/*=========================================
            НАЧАЛО ПРОВОДА
=========================================*/

leftConnectors.forEach((connector) => {
  connector.addEventListener("mousedown", startDrag);
});

function startDrag(e) {
  if (startConnector != null) return;

  startConnector = e.target;

  currentLine = createLine();

  updateLine(e.clientX, e.clientY);

  document.addEventListener("mousemove", dragWire);

  document.addEventListener("mouseup", stopDrag);
}

/*=========================================
            ТЯНЕМ
=========================================*/

function dragWire(e) {
  updateLine(e.clientX, e.clientY);
}

/*=========================================
            ОТПУСТИЛИ
=========================================*/

function stopDrag(e) {
  document.removeEventListener("mousemove", dragWire);
  document.removeEventListener("mouseup", stopDrag);

  const target = document.elementFromPoint(e.clientX, e.clientY);

  if (
    target &&
    target.classList.contains("right") &&
    target.dataset.id == startConnector.dataset.id
  ) {
    connectLine(target);

    connected++;

    taskText.innerText = `Подключено: ${connected} / 4`;

    connectSound.currentTime = 0;
    connectSound.play();

    if (connected == 4) {
      setTimeout(win, 500);
    }
  } else {
    errorSound.currentTime = 0;
    errorSound.play();

    currentLine.remove();
  }

  currentLine = null;
  startConnector = null;
}

/*=========================================
            СОЕДИНИТЬ
=========================================*/

function connectLine(target) {
  const start = getCenter(startConnector);
  const end = getCenter(target);

  currentLine.setAttribute("x1", start.x);
  currentLine.setAttribute("y1", start.y);

  currentLine.setAttribute("x2", end.x);
  currentLine.setAttribute("y2", end.y);

  startConnector.style.pointerEvents = "none";
  target.style.pointerEvents = "none";
}

/*=========================================
        СОЗДАТЬ ЛИНИЮ
=========================================*/

function createLine() {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

  line.setAttribute("stroke", "#46E6D2");
  line.setAttribute("stroke-width", "6");
  line.setAttribute("stroke-linecap", "round");

  svg.appendChild(line);

  return line;
}

/*=========================================
        ОБНОВИТЬ ЛИНИЮ
=========================================*/

function updateLine(mouseX, mouseY) {
  const start = getCenter(startConnector);

  currentLine.setAttribute("x1", start.x);
  currentLine.setAttribute("y1", start.y);

  const svgRect = svg.getBoundingClientRect();

  currentLine.setAttribute("x2", mouseX - svgRect.left);
  currentLine.setAttribute("y2", mouseY - svgRect.top);
}

/*=========================================
            ЦЕНТР
=========================================*/

function getCenter(element) {
  const rect = element.getBoundingClientRect();

  const svgRect = svg.getBoundingClientRect();

  return {
    x: rect.left + rect.width / 2 - svgRect.left,

    y: rect.top + rect.height / 2 - svgRect.top,
  };
}

/*=========================================
            ПОБЕДА
=========================================*/

function win() {
  successSound.play();

  successModal.style.display = "flex";
}

/*=========================================
            ДАЛЕЕ
=========================================*/

continueButton.addEventListener("click", () => {
  document.body.style.opacity = "0";

  setTimeout(() => {
    window.location.href = "game.html";
  }, 1000);
});
