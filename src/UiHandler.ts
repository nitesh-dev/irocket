// handle game ui, and trigger game facility

import { setup, onPlay, onFinish, onReset } from "./main";

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



export function clearGameOverScreen(){
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
      return
    }

    index++;
  }
}

window.addEventListener("load", setup);

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
