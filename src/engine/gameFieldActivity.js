import { rollCard } from "../events/crads-events.js";
import { gameState } from "../engine/gameStatistics.js";
import { selDifLvl, selectSardSet } from "../events/settnigs-events";
import { newGame, openSettings } from "../events/buttons-clicks.js";

// create settings sekectors
const createSelector = (inEl, func, parametrsArray) => {
  let selector = document.createElement("select");

  let inText = "";
  selector.onchange = function () {
    func(selector.value);
  };

  parametrsArray.forEach((el, ind) => {
    if (ind === 0) inText += `<option selected value="${el}" >${el}</option>`;
    else inText += `<option value="${el}">${el}</option>`;
  });
  selector.innerHTML = inText;

  inEl.append(selector);
};

// input parameter - elemet which must be removed
const removeField = (elemeintId) => {
  const removedActivity = document.getElementById(elemeintId);
  removedActivity.remove();
};

const openGameSettings = () => {
  removeField("game-menu");
  const doc = document.getElementById("work-space");
  let div = document.createElement("div");
  div.setAttribute("id", "game-menu");
  doc.append(div);

  createSelector(div, selDifLvl, ["Easy", "Medium", "Hard"]);
  createSelector(div, selectSardSet, ["Cats", "Lenin"]);

  let button = document.createElement("button");
  button.onclick = function () {
    renderGameMenu("game-menu");
  };
  button.classList.add("menu-btn");
  button.innerText = "Back";
  button.setAttribute("id", "back-to-main-menu-btn");
  div.append(button);
};

// game field
const addInfoBar = () => {
  const doc = document.getElementById("work-space");
  const gameField = document.createElement("div");
  gameField.setAttribute("id", "game-field");
  gameField.innerHTML = `<span id="infoBar">
                            <p id="countClick"><b>Number of clicks:</b> 0</p> 
                            <p id="stopwatch"><b>Time:</b> 00:00:00</p>
                         </span>`;
  doc.append(gameField);
};

const addCardsOnField = (fieldSize) => {
  const doc = document.getElementById("game-field");

  for (let i = 0; i < fieldSize; i++) {
    const div = document.createElement("div");
    div.classList.add("card");

    //Alternative solution - use Event delegation on work-space
    div.onclick = function () {
      rollCard(div);
    };
    div.setAttribute("activated", false);

    div.setAttribute("id", `${i}-card`);
    div.innerHTML = `<div class="front-card" activated="false"></div>
          <div class="back-card"></div>`;
    doc.append(div);
  }
};

const genetateGameField = (fieldSize) => {
  removeField("game-menu");
  addInfoBar();
  addCardsOnField(fieldSize);
};
//
// Game menu
const renderGameMenu = (oldActivity) => {
  removeField(`${oldActivity}`);
  const doc = document.getElementById("work-space");
  const div = document.createElement("div");
  div.setAttribute("id", "game-menu");
  div.innerHTML = `<button class="menu-btn" id="new-game-btn">New Game</button>
                   <button class="menu-btn" id="options-btn">Options</button>`;
  doc.append(div);
  addGameMenuListner();
};

const addGameMenuListner = () => {
  const newGameBtn = document.getElementById("new-game-btn");
  const optionsBtn = document.getElementById("options-btn");
  newGameBtn.onclick = newGame;
  optionsBtn.onclick = openSettings;
};

//
// Modal window
const hiddenEndGameWindow = () => {
  const backModal = document.getElementById("openModal");
  backModal.style.visibility = "hidden";
  const modalWindow = document.getElementById("modalDialog");
  modalWindow.style.top = "-999px";
};

const showEndGameWindow = () => {
  const backModal = document.getElementById("openModal");
  backModal.style.visibility = "visible";
  const modalWindow = document.getElementById("modalDialog");
  modalWindow.style.top = "0px";
  console.log(modalWindow.childNodes[3]);
  console.log(modalWindow.childNodes[5]);
  modalWindow.childNodes[3].innerText = `Travel time: ${gameState.countClicks}`;
  modalWindow.childNodes[5].innerText = `Number of Clicks: ${gameState.stopwatch.currentTime}`;
};
//

export {
  openGameSettings,
  genetateGameField,
  showEndGameWindow,
  renderGameMenu,
  hiddenEndGameWindow,
};
