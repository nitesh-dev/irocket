// handle game ui, and trigger game facility


let timer: any = undefined

import { setup, onPlay, onFinish, onReset, updateGamePlayerRanks, setupPlayers } from "./main";
import { calculateElapsedTime, usernames } from "./utils";

const progressEle = document.querySelector(
  "#game-progress-load"
) as HTMLDivElement | null;
const progressFill = document.querySelector(
  "#game-progress-load .fill"
) as HTMLDivElement | null;

export function onLoadProgress(progress: number) {
  console.log(progress);
  if (progressFill) progressFill.style.width = progress + "%";
  if (progressEle && Math.round(progress) == 100) {
    progressEle.classList.add("hide");
    document
      .querySelector("#canvas-container .game-ui")
      ?.classList.remove("hide");
  }
}

const gameOverElements = document.querySelectorAll(
  "#canvas-container .game-over-img"
);

const rankPanel = document.querySelector("#rank-panel") as HTMLDivElement;

export interface PlayerRank {
  name: string;
  rank: number;
  className: string;
}

let playerRanks = usernames.map((item, index) => {
  const i: PlayerRank = {
    name: item,
    rank: index + 1,
    className: "rocket-" + (index + 1),
  };

  return i;
});

const rankItem = `<span class="rank">#1</span> <span class="name">Username1</span>`;
function createPlayers() {
  // Remove all child elements from the div
  while (rankPanel.firstChild) {
    rankPanel.removeChild(rankPanel.firstChild);
  }

  playerRanks.forEach((element) => {
    const para = document.createElement("p");
    para.innerHTML = rankItem;
    para.querySelector(".rank")!.innerHTML = "#" + element.rank;
    para.querySelector(".name")!.innerHTML = element.name;
    para.querySelector(".name")!.className = element.className;

    rankPanel.appendChild(para);
  });
}

function updatePlayerRanks(ranks: Array<PlayerRank>) {
  playerRanks = [...ranks];
  createPlayers();
  updateGamePlayerRanks(playerRanks)
}




const timerEle = document.querySelector("#timer") as HTMLParagraphElement
let startTime = 0
function onTimerChange(){
  timerEle.innerText = calculateElapsedTime(startTime)
}


export function resetTimer(){
  stopTimer()
  timerEle.innerText = "00:00:000"
}

export function stopTimer(){
  clearInterval(timer)
}

export function startTimer(){
  startTime = new Date().getTime()
  timer = setInterval(onTimerChange, 1)
}

export function clearGameOverScreen() {
  for (const iterator of gameOverElements) {
    iterator.classList.remove("animate");
  }
}
export function onGameOver(rank: number) {
  console.log(rank + 1, "ranked");

  let index = 0;
  for (const iterator of gameOverElements) {
    if (index == rank - 1) {
      iterator.classList.add("animate");
      return;
    }

    index++;
  }
}

window.addEventListener("load", () => {
  createPlayers();
  setupPlayers(playerRanks)
  setup();
});

(document.querySelector("#play") as HTMLButtonElement).addEventListener(
  "click",
  onPlay
);
(document.querySelector("#reset") as HTMLButtonElement).addEventListener(
  "click",
  onReset
);
(document.querySelector("#finish") as HTMLButtonElement).addEventListener(
  "click",
  () => {
    onFinish(1);
  }
);

(document.querySelector("#random-rank") as HTMLButtonElement).addEventListener(
  "click",
  () => {
    // generate random rank

    const tempArr = playerRanks.slice();
    for (let i = tempArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tempArr[i], tempArr[j]] = [tempArr[j], tempArr[i]];
    }

    const newRanks = tempArr.map((item, index) => {
      return { name: item.name, rank: index + 1, className: item.className };
    });

    updatePlayerRanks(newRanks);
  }
);
