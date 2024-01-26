// store game business logic

import * as PIXI from "pixi.js";
import {
  PlayerRank,
  clearGameOverScreen,
  createPlayers,
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

import {
  playCountDownSound,
  playIntroSound,
  playFinishSound,
  playCrossFinishSound,
  playBackgroundSound,
} from "./audioManager";
import { isLowResolution } from "./utils";
import GameObject from "./gameObject";

class Sprite extends PIXI.AnimatedSprite {
  to = -1;
  isPlay = false;
  deltaCounter = 0;
  timeToReach = 1;
  constructor(textures: PIXI.Texture[], autoUpdate?: boolean) {
    super(textures, autoUpdate);
  }

  playTo(to: number) {
    this.to = to;
    this.isPlay = true;
  }
  stop(): void {
    super.stop();
    this.isPlay = false;
    this.to = -1;
  }
  updateMe(delta: number) {
    if (this.to < 0 || !this.isPlay || this.currentFrame == this.to) {
      this.isPlay = false;
      return;
    }

    // console.log(
    //   this.to,
    //   this.isPlay,
    //   this.currentFrame,
    //   this.deltaCounter,
    //   delta
    // );
    if (this.deltaCounter > this.timeToReach) {
      this.deltaCounter = 0;

      // inc or dec frame
      const incDec = this.currentFrame < this.to ? 1 : -1;
      this.currentFrame += incDec;
    }
    this.deltaCounter += delta * this.totalFrames;
  }
}

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

  updateWorldScale();
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

const gameAnimSpeed = 0.4;

// ---------------------------------------------- objects ------------------------------------------------------------

// let introTextures: any;

// let finishLineTextures: any;
// let raceLoopTextures: any;
// let raceLoopRocketTextures = new Array();
let finishRocketTextures = new Array();

let finalRocketTextures = new Array();

const totalProgress = getTotalFileLength();
let progressOffset = 0;
function calculateLoadingProgress() {
  progressOffset += 1;
  const percent = Math.round((progressOffset / totalProgress) * 100);

  onLoadProgress(percent);
}

export async function loadMyTextures(urls: Array<string>) {
  const tempTextures = urls.map((item, index) => {
    const temp = PIXI.Assets.load(item);
    calculateLoadingProgress();
    return temp;
  });

  const load = await Promise.all(tempTextures);
  // console.log(load);
  return load;
}

async function loadAssets(times: number) {
  //1

  try {
    // 1
    progressOffset = 0;
    await loadMyTextures([getIntroTexturesUrl()]);

    // 2
    await loadMyTextures(getRaceLoopFinishLineTexturesUrl());
    await loadMyTextures([getRaceLoopTexturesUrl()]);

    await loadMyTextures(getRaceLoopRocketTexturesUrl("a"));

    await loadMyTextures(getRaceLoopRocketTexturesUrl("b"));

    await loadMyTextures(getRaceLoopRocketTexturesUrl("c"));

    await loadMyTextures(getRaceLoopRocketTexturesUrl("d"));

    await loadMyTextures(getRaceLoopRocketTexturesUrl("e"));

    await loadMyTextures(getRaceLoopRocketTexturesUrl("f"));

    await loadMyTextures(getRaceLoopRocketTexturesUrl("g"));

    await loadMyTextures(getRaceLoopRocketTexturesUrl("h"));

    await loadMyTextures(getRaceLoopRocketTexturesUrl("i"));

    await loadMyTextures(getRaceLoopRocketTexturesUrl("j"));

    // 3
    await loadMyTextures([getFinishBackTexturesUrl()]);

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

    await loadMyTextures([getFinalBackTexturesUrl()]);
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

export async function onReset() {
  if (!isGameLoaded) {
    print("Game is not loaded yet!");
    return;
  }

  playBackgroundSound(false);

  gameState = "ideal";
  resetCount += 1;
  resetTimer();

  clearGameOverScreen();
  createDeleteRocketFinishGroup(true);
  createDeleteIntro(true);
  createDeleteRaceLoopGroup(true);
  createDeleteFinalRocket(rocketFinishIndex, true);
  await createDeleteIntro(false);
}

export async function onPlay() {
  if (!isGameLoaded) {
    print("Game is not loaded yet!");
    return;
  }

  await onReset();
  if (intro) intro.play();
  gameState = "intro";
  playIntroSound();
}

let rocketFinishIndex = 0;

export function onFinish(index: number) {
  if (index < 0 && index > 9) {
    print("Index is out of range, it should be 0 - 9");
    return;
  }

  console.log(gameState, "onfinish");

  if (gameState != "race") {
    print(
      "Unable to finish game in another state, wait for the state to complete"
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

  // destroyTextures(getIntroTexturesUrl());

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
let intro: GameObject;
let raceLoopContainer = new PIXI.Container();
let finalContainer = new PIXI.Container();

let finishLine: PIXI.AnimatedSprite | null;

let finishRocketRaceContainer: PIXI.Container | null = null;
let resetCount = 0;

function setupWorld() {
  updateWorldScale();
  app.stage.addChild(world);
  isGameLoaded = true;
}

function updateWorldScale() {
  // calculating scale factor
  let scale = 1;

  // 1536
  if (isLowResolution()) {
    scale = app.screen.width / 768;
  } else {
    scale = app.screen.width / 1536;
  }

  // if (app.screen.width > app.screen.height) {
  // } else {
  //   scale = app.screen.height / 1536;
  // }

  world.x = app.screen.width / 2;
  world.y = app.screen.height / 2;

  world.scale.set(scale, scale);
}


let oldIntroSound = 0
async function createDeleteIntro(isDelete: boolean) {
  if (isDelete) {
    if (intro && intro.gameObject) {
      intro.removeEndListener(onIntroAnimationComplete);
      world.removeChild(intro.gameObject);
    }
    return;
  }

  intro = new GameObject(false);
  await intro.create(getIntroTexturesUrl(), true);
  console.log("introTextures loaded");
  intro.reset();

  intro.gameObject!!.anchor.set(0.5, 0.5);
  intro.gameObject!!.x = 0;
  intro.gameObject!!.y = 50;

  // intro.loop = false;
  // intro.animationSpeed = 0.3;
  // intro.play()
  // intro.onFrameChange = (currentFrame: number) => {
  //   if (currentFrame == 40) {
  //     playCountDownSound(3);
  //   } else if (currentFrame == 55) {
  //     playCountDownSound(2);
  //   } else if (currentFrame == 69) {
  //     playCountDownSound(1);
  //   } else if (currentFrame == 81) {
  //     playCountDownSound(4);
  //   }
  // };
  intro.onPlaying((time: number) => {
    const currentTime = Math.round(time)
    if(oldIntroSound == currentTime) return
    oldIntroSound = currentTime
    if (currentTime == 3) {
      playCountDownSound(3);
    } else if (currentTime == 4) {
      playCountDownSound(2);
    } else if (currentTime == 5) {
      playCountDownSound(1);
    } else if (currentTime == 6) {
      playCountDownSound(4);
    }
  });
  intro.addEndListener(onIntroAnimationComplete);
  world.addChild(intro.gameObject!!);
}

let playerRanks = Array<PlayerRank>();
export function setupPlayers(ranks: Array<PlayerRank>) {
  playerRanks = ranks.slice();
}
type RocketInfo = {
  player: PlayerRank;
  rocket: Sprite;
  stopFrame: number;
  oldDirection: "up" | "down";
  isRev?: boolean;
};
let raceLoopRocketsArr = new Array<RocketInfo>();
let isRocketRankChangeAllowed = false;

// max index 29

async function createDeleteRaceLoopGroup(isDelete: boolean) {
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

  const raceLoop = new GameObject(true);
  await raceLoop.create(getRaceLoopTexturesUrl());

  if (raceLoop.gameObject) {
    raceLoop.play();
    raceLoop.gameObject.anchor.set(0.5, 0.5);
    raceLoopContainer.addChild(raceLoop.gameObject);
  }

  playBackgroundSound(true);

  const finishLineTextures = await loadMyTextures(
    getRaceLoopFinishLineTexturesUrl()
  );
  finishLine = new PIXI.AnimatedSprite(finishLineTextures);
  finishLine.anchor.set(0.5, 0.5);
  finishLine.animationSpeed = gameAnimSpeed;
  finishLine.loop = false;
  finishLine.visible = false;
  finishLine.onComplete = onFinishLineAnimationComplete;
  raceLoopContainer.addChild(finishLine);

  const halfW = raceLoopContainer.width / 2;
  const halfH = raceLoopContainer.height / 2;

  const raceLoopRocketTextures = [];

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

  let pos = Array<number>();

  const isLow = isLowResolution();
  if (isLow) {
    pos = [-290, -250, -180, -110, -40, 40, 110, 180, 250, 290];
  } else {
    pos = [-595, -500, -360, -220, -60, 80, 220, 360, 500, 595];
  }

  let rocketY = halfH - 80;
  if (isLow) rocketY = halfH - 30;
  const rocket1 = new Sprite(raceLoopRocketTextures[0]);
  rocket1.x = pos[0];

  const rocket2 = new Sprite(raceLoopRocketTextures[1]);
  rocket2.x = pos[1];

  const rocket3 = new Sprite(raceLoopRocketTextures[2]);
  rocket3.x = pos[2];

  const rocket4 = new Sprite(raceLoopRocketTextures[3]);
  rocket4.x = pos[3];

  const rocket5 = new Sprite(raceLoopRocketTextures[4]);
  rocket5.x = pos[4];

  const rocket6 = new Sprite(raceLoopRocketTextures[5]);
  rocket6.x = pos[5];

  const rocket7 = new Sprite(raceLoopRocketTextures[6]);
  rocket7.x = pos[6];

  const rocket8 = new Sprite(raceLoopRocketTextures[7]);
  rocket8.x = pos[7];

  const rocket9 = new Sprite(raceLoopRocketTextures[8]);
  rocket9.x = pos[8];

  const rocket10 = new Sprite(raceLoopRocketTextures[9]);
  rocket10.x = pos[9];

  raceLoopRocketsArr = new Array<RocketInfo>();

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
    element.rocket.visible = true;
    element.rocket.animationSpeed = gameAnimSpeed;
    element.rocket.play();
    element.rocket.onFrameChange = (cFrame: number) => {
      // console.log(num, element.player.className)
      if (isRocketRankChangeAllowed) {
        if (cFrame == element.stopFrame) {
          //element.rocket.stop();
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

  app.ticker.add((delta) => {
    for (const element of raceLoopRocketsArr) {
      element.rocket.updateMe(delta / 60);
    }
  });
}

export async function updateGamePlayerRanks(ranks: Array<PlayerRank>) {
  // console.log("game");
  if (!isRocketRankChangeAllowed) {
    print("Rank change not allowed");
    return;
  }

  createPlayers();

  const frameInv = Math.floor(30 / ranks.length);

  const raceLoopRocketTextures = [];

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

  for (const element of raceLoopRocketsArr) {
    const index = ranks.findIndex((item) => item.name == element.player.name);
    if (index != -1) {
      const oldPos = (ranks.length - element.player.rank) * frameInv;
      const gotoFrame = (ranks.length - ranks[index].rank) * frameInv;
      // console.log(element.player.name, gotoFrame, ranks[index].rank);
      let textures = Array();

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
      const newRank = Math.floor(Math.random() * 9 + 1);
      //goToFrameAndPlay(element, element.player.rank, newRank, textures);
      element.rocket.timeToReach = 1.5;
      element.rocket.playTo(gotoFrame);
      element.player.rank = newRank;
    }
  }
}

async function createDeleteRocketFinishGroup(isDelete: boolean) {
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
  const finishBack = new GameObject(false);
  await finishBack.create(getFinishBackTexturesUrl());
  if (finishBack.gameObject) {
    finishBack.gameObject.anchor.set(0.5, 0.5);
    finishBack.gameObject.x = 0;
    finishBack.gameObject.y = 0;
    finishBack.addEndListener(onFinishRaceBackAnimationComplete);
    finishRocketRaceContainer.addChild(finishBack.gameObject);
    finishBack.play();
  }

  let pos = Array<number>();

  const isLow = isLowResolution();
  if (isLow) {
    pos = [-20, 0, 20, 40, 58, 78, 95, 115, 130, 150];
  } else {
    pos = [-30, 0, 45, 65, 100, 130, 160, 205, 245, 285];
  }

  const rocket1 = new PIXI.AnimatedSprite(finishRocketTextures[0]);
  rocket1.y = pos[0];
  const rocket2 = new PIXI.AnimatedSprite(finishRocketTextures[1]);
  rocket2.y = pos[1];
  const rocket3 = new PIXI.AnimatedSprite(finishRocketTextures[2]);
  rocket3.y = pos[2];
  const rocket4 = new PIXI.AnimatedSprite(finishRocketTextures[3]);
  rocket4.y = pos[3];
  const rocket5 = new PIXI.AnimatedSprite(finishRocketTextures[4]);
  rocket5.y = pos[4];
  const rocket6 = new PIXI.AnimatedSprite(finishRocketTextures[5]);
  rocket6.y = pos[5];
  const rocket7 = new PIXI.AnimatedSprite(finishRocketTextures[6]);
  rocket7.y = pos[6];
  const rocket8 = new PIXI.AnimatedSprite(finishRocketTextures[7]);
  rocket8.y = pos[7];
  const rocket9 = new PIXI.AnimatedSprite(finishRocketTextures[8]);
  rocket9.y = pos[8];
  const rocket10 = new PIXI.AnimatedSprite(finishRocketTextures[9]);
  rocket10.y = pos[9];

  const finishRocketsGroupArray = Array<PIXI.AnimatedSprite>();

  if (playerRanks.findIndex((item) => item.className == "rocket-1") != -1)
    finishRocketsGroupArray.push(rocket1);
  if (playerRanks.findIndex((item) => item.className == "rocket-2") != -1)
    finishRocketsGroupArray.push(rocket2);
  if (playerRanks.findIndex((item) => item.className == "rocket-3") != -1)
    finishRocketsGroupArray.push(rocket3);
  if (playerRanks.findIndex((item) => item.className == "rocket-4") != -1)
    finishRocketsGroupArray.push(rocket4);
  if (playerRanks.findIndex((item) => item.className == "rocket-5") != -1)
    finishRocketsGroupArray.push(rocket5);
  if (playerRanks.findIndex((item) => item.className == "rocket-6") != -1)
    finishRocketsGroupArray.push(rocket6);
  if (playerRanks.findIndex((item) => item.className == "rocket-7") != -1)
    finishRocketsGroupArray.push(rocket7);
  if (playerRanks.findIndex((item) => item.className == "rocket-8") != -1)
    finishRocketsGroupArray.push(rocket8);
  if (playerRanks.findIndex((item) => item.className == "rocket-9") != -1)
    finishRocketsGroupArray.push(rocket9);
  if (playerRanks.findIndex((item) => item.className == "rocket-10") != -1)
    finishRocketsGroupArray.push(rocket10);

  const maxSpeed = 0.8;
  const speedInv = maxSpeed - 0.3;

  playCrossFinishSound();
  playBackgroundSound(false);

  finishRocketsGroupArray.forEach((element, index) => {
    element.anchor.set(0.5, 0);
    element.x = 0;
    element.loop = false;
    element.animationSpeed =
      (1 - playerRanks[index].rank / playerRanks.length) * speedInv + 0.3;
    element.play();
    finishRocketRaceContainer!!.addChild(element);
  });

  world.addChild(finishRocketRaceContainer);
}

async function createDeleteFinalRocket(index: number, isDelete: boolean) {
  if (isDelete) {
    if (finalContainer) {
      finalContainer.removeAllListeners();
      world.removeChild(finalContainer);
    }
    return;
  }

  finalContainer = new PIXI.Container();

  let finalRocketBack = new GameObject(false);
  await finalRocketBack.create(getFinalBackTexturesUrl());
  if (finalRocketBack.gameObject) {
    finalRocketBack.gameObject.anchor.set(0.5, 0.5);
    finalRocketBack.gameObject.x = 0;
    finalRocketBack.gameObject.y = 0;
    finalContainer.addChild(finalRocketBack.gameObject);
    finalRocketBack.play();
  }

  const rocket = new PIXI.AnimatedSprite(finalRocketTextures[index]);
  playFinishSound();

  rocket.visible = true;
  rocket.anchor.set(0.5, 0.5);
  rocket.x = 0;
  rocket.y = 0;
  rocket.loop = false;
  rocket.animationSpeed = 0.3;
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

function goToFrameAndPlay(
  info: RocketInfo,
  oldRank: number,
  newRank: number,
  textures: any[]
) {
  const maxFrame = 29;
  const maxRank = 10;

  const isUp = newRank > oldRank;
  const frameInv = Math.floor(30 / maxRank);
  const oldPos = maxFrame * (oldRank / maxRank);
  const newPos = maxFrame * (newRank / maxRank);

  console.log({ oldRank, newRank, isUp, oldPos, newPos, isRev: info.isRev });

  if (newRank > oldRank) {
    //up
    //rev must be false
    if (info.isRev) {
      info.isRev = false;
      info.rocket.textures = textures;
      info.rocket.gotoAndPlay(maxFrame - oldPos);
    } else {
      info.rocket.gotoAndPlay(oldPos);
    }
    info.stopFrame = newPos;
  } else if (newRank < oldRank) {
    //down
    if (!info.isRev) {
      //reverse it
      info.isRev = true;
      info.rocket.textures = textures.reverse();
      info.rocket.gotoAndPlay(maxFrame - oldPos);
    } else {
      info.rocket.gotoAndPlay(oldPos);
    }
    //if rev
    info.stopFrame = newPos;
  }
}
