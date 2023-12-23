// store game business logic

import * as PIXI from "pixi.js";
import {
  PlayerRank,
  clearGameOverScreen,
  onGameOver,
  onLoadProgress,
  resetTimer,
  startTimer,
  stopTimer,
} from "./UiHandler";
import {
  getFinalBackTexturesUrl,
  getFinalRocketTexturesUrl,
  getFinishBackTexturesUrl,
  getFinishRocketTexturesUrl,
  getIntroTexturesUrl,
  getRaceLoopFinishLineTexturesUrl,
  getRaceLoopRocketTexturesUrl,
  getRaceLoopTexturesUrl,
  getTotalFileLength,
} from "./assetsTextures";

// resize the canvas
let canvasContainer: HTMLDivElement | null = null;

let app: PIXI.Application<PIXI.ICanvas>;

window.addEventListener("resize", updateCanvasSize);
function updateCanvasSize() {
  resize();
}

function resize() {
  if (!canvasContainer) return;
  app.renderer.resize(
    canvasContainer.clientWidth,
    canvasContainer.clientHeight
  );
}

//  -------------------------------------------- Media query in js ------------------------------------
let isSmallerDevice = false;
function onMediaQuery(x: any) {
  if (x.matches) {
    // If media query matches
    isSmallerDevice = true;
  } else {
    isSmallerDevice = false;
  }

  if (isSmallerDevice) {
  } else {
  }
}

var media = window.matchMedia("(max-width: 800px)");
onMediaQuery(media);
media.addEventListener("change", onMediaQuery);

// --------------------------------------------- control -------------------------------------------------------

export function setup() {
  canvasContainer = document.querySelector(
    "#canvas-container"
  ) as HTMLDivElement;

  app = new PIXI.Application({
    antialias: true,
    width: canvasContainer.clientWidth,
    height: canvasContainer.clientHeight,
    backgroundAlpha: 0,
  });

  // (app.view as HTMLCanvasElement).style.backgroundColor = "transparent"

  canvasContainer.appendChild(app.view as any);
  onStart();
}

let isTestingMode = true;
let gameState: "ideal" | "intro" | "race" | "finish-line" | "finish" | "final" =
  "ideal";

const gameAnimSpeed = 0.3;

// ---------------------------------------------- objects ------------------------------------------------------------

let introTextures: any;

let finishLineTextures: any;
let raceLoopTextures: any;
let raceLoopRocketTextures = new Array();

let finishBackTextures: any;
let finishRocketTextures = new Array();

let finalBackTextures: any;
let finalRocketTextures = new Array();

const totalProgress = getTotalFileLength();
let progressOffset = 0;
function calculateLoadingProgress() {
  progressOffset += 1;
  const percent = Math.round((progressOffset / totalProgress) * 100);

  onLoadProgress(percent);
}

async function loadMyTextures(urls: Array<string>) {
  const tempTextures = urls.map((item, index) => {
    const temp = PIXI.Assets.load(item);
    calculateLoadingProgress();
    return temp;
  });

  const load = await Promise.all(tempTextures);
  return load;
}

async function loadAssets(times: number) {
  //1

  try {
    // 1
    progressOffset = 0;
    introTextures = await loadMyTextures(getIntroTexturesUrl());

    // 2
    finishLineTextures = await loadMyTextures(
      getRaceLoopFinishLineTexturesUrl()
    );
    raceLoopTextures = await loadMyTextures(getRaceLoopTexturesUrl());

    raceLoopRocketTextures = [];
    raceLoopRocketTextures.push(
      await loadMyTextures(getRaceLoopRocketTexturesUrl("a"))
    );
    raceLoopRocketTextures.push(
      await loadMyTextures(getRaceLoopRocketTexturesUrl("b"))
    );
    raceLoopRocketTextures.push(
      await loadMyTextures(getRaceLoopRocketTexturesUrl("c"))
    );
    raceLoopRocketTextures.push(
      await loadMyTextures(getRaceLoopRocketTexturesUrl("d"))
    );
    raceLoopRocketTextures.push(
      await loadMyTextures(getRaceLoopRocketTexturesUrl("e"))
    );
    raceLoopRocketTextures.push(
      await loadMyTextures(getRaceLoopRocketTexturesUrl("f"))
    );
    raceLoopRocketTextures.push(
      await loadMyTextures(getRaceLoopRocketTexturesUrl("g"))
    );
    raceLoopRocketTextures.push(
      await loadMyTextures(getRaceLoopRocketTexturesUrl("h"))
    );
    raceLoopRocketTextures.push(
      await loadMyTextures(getRaceLoopRocketTexturesUrl("i"))
    );
    raceLoopRocketTextures.push(
      await loadMyTextures(getRaceLoopRocketTexturesUrl("j"))
    );

    // 3
    finishBackTextures = await loadMyTextures(getFinishBackTexturesUrl());

    finishRocketTextures = [];
    finishRocketTextures.push(
      await loadMyTextures(getFinishRocketTexturesUrl("a"))
    );
    finishRocketTextures.push(
      await loadMyTextures(getFinishRocketTexturesUrl("b"))
    );
    finishRocketTextures.push(
      await loadMyTextures(getFinishRocketTexturesUrl("c"))
    );
    finishRocketTextures.push(
      await loadMyTextures(getFinishRocketTexturesUrl("d"))
    );
    finishRocketTextures.push(
      await loadMyTextures(getFinishRocketTexturesUrl("e"))
    );
    finishRocketTextures.push(
      await loadMyTextures(getFinishRocketTexturesUrl("f"))
    );
    finishRocketTextures.push(
      await loadMyTextures(getFinishRocketTexturesUrl("g"))
    );
    finishRocketTextures.push(
      await loadMyTextures(getFinishRocketTexturesUrl("h"))
    );
    finishRocketTextures.push(
      await loadMyTextures(getFinishRocketTexturesUrl("i"))
    );
    finishRocketTextures.push(
      await loadMyTextures(getFinishRocketTexturesUrl("j"))
    );

    // 4

    finalBackTextures = await loadMyTextures(getFinalBackTexturesUrl());
    finalRocketTextures = [];

    finalRocketTextures.push(
      await loadMyTextures(getFinalRocketTexturesUrl("a"))
    );
    finalRocketTextures.push(
      await loadMyTextures(getFinalRocketTexturesUrl("b"))
    );
    finalRocketTextures.push(
      await loadMyTextures(getFinalRocketTexturesUrl("d"))
    );
    finalRocketTextures.push(
      await loadMyTextures(getFinalRocketTexturesUrl("d"))
    );
    finalRocketTextures.push(
      await loadMyTextures(getFinalRocketTexturesUrl("e"))
    );
    finalRocketTextures.push(
      await loadMyTextures(getFinalRocketTexturesUrl("f"))
    );
    finalRocketTextures.push(
      await loadMyTextures(getFinalRocketTexturesUrl("g"))
    );
    finalRocketTextures.push(
      await loadMyTextures(getFinalRocketTexturesUrl("h"))
    );
    finalRocketTextures.push(
      await loadMyTextures(getFinalRocketTexturesUrl("i"))
    );
    finalRocketTextures.push(
      await loadMyTextures(getFinalRocketTexturesUrl("j"))
    );

    return true;
  } catch (error) {
    print(error as string);
    if (times == 1) return false;
    return loadAssets(1);
  }
}

// ---------------------------------------------------- callback ---------------------------------------------------------

let isGameLoaded = false;
async function onStart() {
  print("start called");
  const isLoaded = await loadAssets(0);

  if (!isLoaded) {
    print("Failed to load game due to errors");
    return;
  }

  setupWorld();
  onReset();
}

export function onReset() {
  if (!isGameLoaded) {
    print("Game is not loaded yet!");
    return;
  }

  gameState = "ideal";
  resetCount += 1;
  resetTimer();

  clearGameOverScreen();
  createDeleteRocketFinishGroup(true);
  createDeleteIntro(true);
  createDeleteRaceLoopGroup(true);
  createDeleteFinalRocket(rocketFinishIndex, true);
  createDeleteIntro(false);
}

export function onPlay() {
  if (!isGameLoaded) {
    print("Game is not loaded yet!");
    return;
  }

  onReset();
  if (intro) intro.play();
  gameState = "intro";
}

let rocketFinishIndex = 0;

export function onFinish(index: number) {
  if (index < 0 && index > 9) {
    print("Index is out of range, it should be 0 - 9");
    return;
  }

  if (gameState != "race") {
    print(
      "Unable to finish game while in intro, please wait for the intro to finish"
    );
    return;
  }

  gameState = "finish-line";
  rocketFinishIndex = index;

  if (!isGameLoaded) {
    print("Game is not loaded yet!");
    return;
  }

  if (finishLine) {
    finishLine.visible = true;
    finishLine.play();
  }
}

function onFinishLineAnimationComplete() {
  if (gameState != "finish-line") {
    print("Finish not allowed");
    return;
  }

  gameState = "finish";
  stopTimer();
  createDeleteRaceLoopGroup(true);
  createDeleteRocketFinishGroup(false);
}

function onIntroAnimationComplete() {
  if (gameState != "intro") {
    print("Race loop not allowed");
    return;
  }

  gameState = "race";
  startTimer();
  createDeleteIntro(true);
  createDeleteRaceLoopGroup(false);
}

function onFinishRaceBackAnimationComplete() {
  print("finish race");

  if (gameState != "finish") {
    print("Finish not allowed");
    return;
  }

  gameState = "final";
  createDeleteRocketFinishGroup(true);
  createDeleteFinalRocket(rocketFinishIndex, false);
}

// ---------------------------------------------  game logic ------------------------------------------------
let world = new PIXI.Container();
let intro: PIXI.AnimatedSprite;
let raceLoopContainer = new PIXI.Container();
let finalContainer = new PIXI.Container();

let finishLine: PIXI.AnimatedSprite | null;

let finishRocketRaceContainer: PIXI.Container | null = null;
let resetCount = 0;

function setupWorld() {
  // calculating scale factor
  let scale = 1;

  if (app.screen.width > app.screen.height) {
    scale = app.screen.width / 1536;
  } else {
    scale = app.screen.height / 1536;
  }

  world.x = app.screen.width / 2;
  world.y = app.screen.height / 2;

  world.scale.set(scale, scale);

  app.stage.addChild(world);

  isGameLoaded = true;
}

function createDeleteIntro(isDelete: boolean) {
  if (isDelete) {
    if (intro) {
      intro.onComplete = () => {
        print("skipped intro listener");
      };
      world.removeChild(intro);
    }
    return;
  }

  intro = new PIXI.AnimatedSprite(introTextures);
  intro.anchor.set(0.5, 0.5);
  intro.x = 0;
  intro.y = 0;
  intro.loop = false;
  intro.animationSpeed = gameAnimSpeed;
  intro.onComplete = onIntroAnimationComplete;
  world.addChild(intro);
}

let playerRanks = Array<PlayerRank>();
export function setupPlayers(ranks: Array<PlayerRank>) {
  playerRanks = ranks.slice();
}

let raceLoopRocketsArr = new Array<{
  player: PlayerRank;
  rocket: PIXI.AnimatedSprite;
  stopFrame: number;
  oldDirection: "up" | "down";
}>();
let isRocketRankChangeAllowed = false;

// max index 29
export function updateGamePlayerRanks(ranks: Array<PlayerRank>) {
  if (!isRocketRankChangeAllowed) {
    print("Rank change not allowed");
    return;
  }

  const frameInv = Math.floor(30 / ranks.length);

  for (const element of raceLoopRocketsArr) {
    const index = ranks.findIndex((item) => item.name == element.player.name);
    if (index != -1) {
      const gotoFrame = (ranks.length - ranks[index].rank) * frameInv;

      let direction: "up" | "down" = "up";
      if (element.rocket.currentFrame > gotoFrame) direction = "down";

      let textures = Array();

      element.player.rank = ranks[index].rank;

      if (element.player.className == "rocket-1") {
        textures = raceLoopRocketTextures[0].slice();
      } else if (element.player.className == "rocket-2") {
        textures = raceLoopRocketTextures[1].slice();
      } else if (element.player.className == "rocket-3") {
        textures = raceLoopRocketTextures[2].slice();
      } else if (element.player.className == "rocket-4") {
        textures = raceLoopRocketTextures[3].slice();
      } else if (element.player.className == "rocket-5") {
        textures = raceLoopRocketTextures[4].slice();
      } else if (element.player.className == "rocket-6") {
        textures = raceLoopRocketTextures[5].slice();
      } else if (element.player.className == "rocket-7") {
        textures = raceLoopRocketTextures[6].slice();
      } else if (element.player.className == "rocket-8") {
        textures = raceLoopRocketTextures[7].slice();
      } else if (element.player.className == "rocket-9") {
        textures = raceLoopRocketTextures[8].slice();
      } else if (element.player.className == "rocket-10") {
        textures = raceLoopRocketTextures[9].slice();
      }

      // console.log(element.player.name, element.stopFrame, gotoFrame);

      console.log(direction);
      if (direction == "up") {
        element.rocket.textures = textures;
        if (element.oldDirection == "down") {
          element.rocket.gotoAndStop(
            element.rocket.totalFrames - 1 - element.rocket.currentFrame
          );
          element.oldDirection = "up";
        }
        element.stopFrame = gotoFrame;
        element.rocket.play();
      } else {
        element.rocket.textures = textures.reverse();
        if (element.oldDirection == "up") {
          element.rocket.gotoAndStop(
            element.rocket.totalFrames - 1 - element.rocket.currentFrame
          );
          element.oldDirection = "down";
        }
        element.stopFrame = element.rocket.totalFrames - 1 - gotoFrame;
        element.rocket.play();
      }


    }
  }
}

function createDeleteRaceLoopGroup(isDelete: boolean) {
  isRocketRankChangeAllowed = false;
  if (isDelete) {
    if (raceLoopContainer) {
      // remove listener
      if (raceLoopRocketsArr.length > 0) {
        raceLoopRocketsArr[0].rocket.onComplete = () => {
          print("skipped listener");
        };
      }
      world.removeChild(raceLoopContainer);
    }
    return;
  }

  raceLoopContainer = new PIXI.Container();

  const raceLoop = new PIXI.AnimatedSprite(raceLoopTextures);
  raceLoop.anchor.set(0.5, 0.5);
  raceLoop.animationSpeed = gameAnimSpeed;
  raceLoop.loop = true;
  raceLoop.play();
  raceLoopContainer.addChild(raceLoop);

  finishLine = new PIXI.AnimatedSprite(finishLineTextures);
  finishLine.anchor.set(0.5, 0.5);
  finishLine.animationSpeed = gameAnimSpeed;
  finishLine.loop = false;
  finishLine.visible = false;
  finishLine.onComplete = onFinishLineAnimationComplete;
  raceLoopContainer.addChild(finishLine);

  const halfW = raceLoopContainer.width / 2;
  const halfH = raceLoopContainer.height / 2;

  const rocketY = halfH - 100;
  const rocket1 = new PIXI.AnimatedSprite(raceLoopRocketTextures[0]);
  rocket1.x = -halfW + 200;

  const rocket2 = new PIXI.AnimatedSprite(raceLoopRocketTextures[1]);
  rocket2.x = -500;

  const rocket3 = new PIXI.AnimatedSprite(raceLoopRocketTextures[2]);
  rocket3.x = -360;

  const rocket4 = new PIXI.AnimatedSprite(raceLoopRocketTextures[3]);
  rocket4.x = -220;

  const rocket5 = new PIXI.AnimatedSprite(raceLoopRocketTextures[4]);
  rocket5.x = -80;

  const rocket6 = new PIXI.AnimatedSprite(raceLoopRocketTextures[5]);
  rocket6.x = 80;

  const rocket7 = new PIXI.AnimatedSprite(raceLoopRocketTextures[6]);
  rocket7.x = 220;

  const rocket8 = new PIXI.AnimatedSprite(raceLoopRocketTextures[7]);
  rocket8.x = 360;

  const rocket9 = new PIXI.AnimatedSprite(raceLoopRocketTextures[8]);
  rocket9.x = 500;

  const rocket10 = new PIXI.AnimatedSprite(raceLoopRocketTextures[9]);
  rocket10.x = -halfW + 1320;

  raceLoopRocketsArr = new Array<{
    player: PlayerRank;
    rocket: PIXI.AnimatedSprite;
    stopFrame: number;
    oldDirection: "up" | "down";
  }>();

  playerRanks.forEach((element) => {
    if (element.className == "rocket-1") {
      raceLoopRocketsArr.push({
        player: element,
        rocket: rocket1,
        stopFrame: 0,
        oldDirection: "up",
      });
    } else if (element.className == "rocket-2") {
      raceLoopRocketsArr.push({
        player: element,
        rocket: rocket2,
        stopFrame: 0,
        oldDirection: "up",
      });
    } else if (element.className == "rocket-3") {
      raceLoopRocketsArr.push({
        player: element,
        rocket: rocket3,
        stopFrame: 0,
        oldDirection: "up",
      });
    } else if (element.className == "rocket-4") {
      raceLoopRocketsArr.push({
        player: element,
        rocket: rocket4,
        stopFrame: 0,
        oldDirection: "up",
      });
    } else if (element.className == "rocket-5") {
      raceLoopRocketsArr.push({
        player: element,
        rocket: rocket5,
        stopFrame: 0,
        oldDirection: "up",
      });
    } else if (element.className == "rocket-6") {
      raceLoopRocketsArr.push({
        player: element,
        rocket: rocket6,
        stopFrame: 0,
        oldDirection: "up",
      });
    } else if (element.className == "rocket-7") {
      raceLoopRocketsArr.push({
        player: element,
        rocket: rocket7,
        stopFrame: 0,
        oldDirection: "up",
      });
    } else if (element.className == "rocket-8") {
      raceLoopRocketsArr.push({
        player: element,
        rocket: rocket8,
        stopFrame: 0,
        oldDirection: "up",
      });
    } else if (element.className == "rocket-9") {
      raceLoopRocketsArr.push({
        player: element,
        rocket: rocket9,
        stopFrame: 0,
        oldDirection: "up",
      });
    } else if (element.className == "rocket-10") {
      raceLoopRocketsArr.push({
        player: element,
        rocket: rocket10,
        stopFrame: 0,
        oldDirection: "up",
      });
    }
  });

  raceLoopRocketsArr.forEach((element) => {
    element.rocket.scale.set(0.9, 0.9);
    element.rocket.anchor.set(0.5, 1);
    element.rocket.y = rocketY;
    element.rocket.loop = false;
    element.rocket.animationSpeed = gameAnimSpeed;
    element.rocket.play();
    element.rocket.onFrameChange = (cFrame: number) => {
      // console.log(num, element.player.className)
      if (isRocketRankChangeAllowed) {
        if (cFrame == element.stopFrame) {
          element.rocket.stop();
        }
      }
    };
    raceLoopContainer.addChild(element.rocket);
  });

  // rocket1.onFrameChange = (num: number) => {
  //   console.log(num)
  // }

  print("Rank change allowed disabled");

  // play all rocket animation in rev order
  rocket1.onComplete = () => {
    setTimeout(() => {
      for (const child of raceLoopRocketsArr) {
        child.rocket.textures = child.rocket.textures.slice().reverse();
        child.rocket.gotoAndPlay(0);
      }

      rocket1.onComplete = () => {
        if (isRocketRankChangeAllowed == false) {
          for (const child of raceLoopRocketsArr) {
            child.rocket.textures = child.rocket.textures.slice().reverse();
          }
        }
        isRocketRankChangeAllowed = true;
        print("Rank change allowed enabled");
      };
    }, 1000);
  };

  world.addChild(raceLoopContainer);
}

function createDeleteRocketFinishGroup(isDelete: boolean) {
  if (isDelete) {
    if (finishRocketRaceContainer) {
      finishRocketRaceContainer.removeAllListeners();
      print("Finish group deleted");
      world.removeChild(finishRocketRaceContainer);
    }
    return;
  }

  if (finishRocketRaceContainer) world.removeChild(finishRocketRaceContainer);

  finishRocketRaceContainer = new PIXI.Container();
  const finishBack = new PIXI.AnimatedSprite(finishBackTextures);
  finishBack.anchor.set(0.5, 0.5);
  finishBack.x = 0;
  finishBack.y = 0;
  finishBack.loop = false;
  finishBack.animationSpeed = gameAnimSpeed;
  finishBack.play();
  finishBack.onComplete = onFinishRaceBackAnimationComplete;

  finishRocketRaceContainer.addChild(finishBack);

  const rocket1 = new PIXI.AnimatedSprite(finishRocketTextures[0]);
  rocket1.y = -30;
  const rocket2 = new PIXI.AnimatedSprite(finishRocketTextures[1]);
  rocket2.y = 0;
  const rocket3 = new PIXI.AnimatedSprite(finishRocketTextures[2]);
  rocket3.y = 45;
  const rocket4 = new PIXI.AnimatedSprite(finishRocketTextures[3]);
  rocket4.y = 65;
  const rocket5 = new PIXI.AnimatedSprite(finishRocketTextures[4]);
  rocket5.y = 100;
  const rocket6 = new PIXI.AnimatedSprite(finishRocketTextures[5]);
  rocket6.y = 130;
  const rocket7 = new PIXI.AnimatedSprite(finishRocketTextures[6]);
  rocket7.y = 160;
  const rocket8 = new PIXI.AnimatedSprite(finishRocketTextures[7]);
  rocket8.y = 205;
  const rocket9 = new PIXI.AnimatedSprite(finishRocketTextures[8]);
  rocket9.y = 245;
  const rocket10 = new PIXI.AnimatedSprite(finishRocketTextures[9]);
  rocket10.y = 285;

  const finishRocketsGroupArray = Array<PIXI.AnimatedSprite>();

  finishRocketsGroupArray.push(rocket1);
  finishRocketsGroupArray.push(rocket2);
  finishRocketsGroupArray.push(rocket3);
  finishRocketsGroupArray.push(rocket4);
  finishRocketsGroupArray.push(rocket5);
  finishRocketsGroupArray.push(rocket6);
  finishRocketsGroupArray.push(rocket7);
  finishRocketsGroupArray.push(rocket8);
  finishRocketsGroupArray.push(rocket9);
  finishRocketsGroupArray.push(rocket10);

  finishRocketsGroupArray.forEach((element) => {
    element.anchor.set(0.5, 0);
    element.x = 0;
    element.loop = false;
    element.animationSpeed = 0.3;
    finishRocketRaceContainer!!.addChild(element);
    element.play();
  });

  world.addChild(finishRocketRaceContainer);
}

function createDeleteFinalRocket(index: number, isDelete: boolean) {
  if (isDelete) {
    if (finalContainer) {
      finalContainer.removeAllListeners();
      world.removeChild(finalContainer);
    }
    return;
  }

  finalContainer = new PIXI.Container();

  let finalRocketBack = new PIXI.AnimatedSprite(finalBackTextures);
  finalRocketBack.anchor.set(0.5, 0.5);
  finalRocketBack.x = 0;
  finalRocketBack.y = 0;
  finalRocketBack.loop = false;
  finalRocketBack.animationSpeed = gameAnimSpeed;
  finalRocketBack.play();
  finalContainer.addChild(finalRocketBack);

  const rocket = new PIXI.AnimatedSprite(finalRocketTextures[index]);

  rocket.visible = true;
  rocket.anchor.set(0.5, 0.5);
  rocket.x = 0;
  rocket.y = 0;
  rocket.loop = false;
  rocket.animationSpeed = gameAnimSpeed;
  rocket.play();

  finalContainer.addChild(rocket);

  world.addChild(finalContainer);

  onGameOver(index + 1);
}

// ----------------------------------------------- testing --------------------------------

function showBoundingBox(
  object: PIXI.Sprite | PIXI.AnimatedSprite | PIXI.Container,
  anchorX: number = 0,
  anchorY: number = 0
) {
  if (!isTestingMode) return;

  const boundingBox = new PIXI.Graphics();
  const bounds = object.getBounds();
  boundingBox.lineStyle(2, 0xffffff); // Red outline
  const x = bounds.width * anchorX - bounds.width;
  const y = bounds.height * anchorY - bounds.height;
  boundingBox.drawRect(x, y, bounds.width, bounds.height);
  boundingBox.beginFill(0xffffff);
  boundingBox.drawCircle(0, 0, 10);
  boundingBox.endFill();
  boundingBox.alpha = 1; // Adjust the alpha for transparency
  object.addChild(boundingBox);
}

function print(msg: string) {
  if (isTestingMode) console.log(msg);
}
