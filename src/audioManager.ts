import { sound } from "@pixi/sound";

// sounds
var constraints = { audio: true }; // add video constraints if required

let isPermissionAllowed = true;

export function loadAudio() {
  addAudios();
}

function addAudios() {
  sound.add("intro-sound", {
    url: "./assets/audio/camera_zoom.mp3",
    preload: true,
  });

  sound.add("one", {
    url: "./assets/audio/1.mp3",
    preload: true,
  });
  sound.add("two", {
    url: "./assets/audio/2.mp3",
    preload: true,
  });
  sound.add("three", {
    url: "./assets/audio/3.mp3",
    preload: true,
  });
  sound.add("go", {
    url: "./assets/audio/go.mp3",
    preload: true,
  });

  sound.add("cross-finish", {
    url: "./assets/audio/cross_finish_fireworks.mp3",
    preload: true,
  });

  sound.add("background-loop", {
    url: "./assets/audio/ehulk-music.mp3",
    preload: true,
  });

  sound.add("engine-loop", {
    url: "./assets/audio/engine2.mp3",
    preload: true,
  });

  sound.add("finish", {
    url: "./assets/audio/finishMusic.mp3",
    preload: true,
  });
}

export function playCountDownSound(value: 1 | 2 | 3 | 4) {
  if (isPermissionAllowed == false) return;

  if (value == 1) sound.play("one", { loop: false, volume: 0.5 });
  if (value == 2) sound.play("two", { loop: false, volume: 0.5 });
  if (value == 3) sound.play("three", { loop: false, volume: 0.5 });
  if (value == 4) sound.play("go", { loop: false, volume: 0.5 });
}

export function playIntroSound() {
  if (isPermissionAllowed == false) return;
  sound.stop("intro-sound");
  sound.play("intro-sound", { loop: false, volume: 0.5 });
}

export function playCrossFinishSound() {
  if (isPermissionAllowed == false) return;
  sound.stop("cross-finish");
  sound.play("cross-finish", { loop: false, volume: 0.5 });
}

export function playFinishSound() {
  if (isPermissionAllowed == false) return;
  sound.stop("finish");
  sound.play("finish", { loop: false, volume: 0.5 });
}

export function playBackgroundSound(isPlaying = true) {
  if (isPermissionAllowed == false) return;

  sound.stop("background-loop");
  sound.stop("engine-loop");
  if (isPlaying) {
    sound.play("background-loop", { loop: true, volume: 0.2 });
    sound.play("engine-loop", { loop: true, volume: 0.5 });
  }
}

export function muteSound(isMute: boolean) {
  if (isMute) {
    sound.muteAll();
  } else {
    sound.unmuteAll();
  }
}
