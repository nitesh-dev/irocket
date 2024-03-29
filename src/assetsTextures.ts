import { isLowResolution } from "./utils";

// 1
let lowPath = "";
export function getIntroTexturesUrl() {
  if (isLowResolution()) lowPath = "/low";
  // const temp = [];
  // for (let index = 0; index <= 178; index += 2) {
  //   temp.push(`assets/img${lowPath}/intro/intro-${numToString(index, 3)}.webp`);
  // }

  return `assets/img${lowPath}/intro/output.mp4`;
}

// 2
export function getRaceLoopTexturesUrl() {
  // const temp = [];
  // for (let index = 0; index <= 238; index += 2) {
  //   temp.push(
  //     `assets/img${lowPath}/race-loop/back/racetrack-${numToString(index, 3)}.webp`
  //   );
  // }
  return `assets/img${lowPath}/race-loop/back/output.mp4`;
}

export function getRaceLoopRocketTexturesUrl(name: string) {
  // a b c ...

  const temp = [];
  for (let index = 1; index <= 59; index += 2) {
    temp.push(
      `assets/img${lowPath}/race-loop/rockets/rocket-${name}-${numToString(
        index,
        2
      )}.webp`
    );
  }
  return temp;
}

export function getRaceLoopFinishLineTexturesUrl() {
  const temp = [];
  for (let index = 0; index <= 186; index += 2) {
    temp.push(
      `assets/img${lowPath}/race-loop/finishLine/finishline-${numToString(
        index,
        4
      )}.webp`
    );
  }
  return temp;
}

// 3

export function getFinishBackTexturesUrl() {
  // const temp = [];
  // for (let index = 0; index <= 62; index += 2) {
  //   temp.push(
  //     `assets/img${lowPath}/finish/back/finish-background-${numToString(index, 2)}.webp`
  //   );
  // }
  return `assets/img${lowPath}/finish/back/output.mp4`;
}

export function getFinishRocketTexturesUrl(name: string) {
  // a b c d...j
  const temp = [];
  for (let index = 1; index <= 59; index += 2) {
    temp.push(
      `assets/img${lowPath}/finish/rockets/rocket-${name}-finish-${numToString(
        index,
        4
      )}.webp`
    );
  }
  return temp;
}

// 4

export function getFinalBackTexturesUrl() {
  // const temp = [];
  // for (let index = 0; index <= 118; index += 2) {
  //   temp.push(
  //     `assets/img${lowPath}/final/back/placement-background_${numToString(index, 3)}.webp`
  //   );
  // }
  return `assets/img${lowPath}/final/back/output.mp4`;
}

export function getFinalRocketTexturesUrl(name: string) {
  // a b c d...j
  const temp = [];
  for (let index = 1; index <= 119; index += 2) {
    temp.push(
      `assets/img${lowPath}/final/rockets/rocket-${name}-placement-${numToString(
        index,
        4
      )}.webp`
    );
  }
  return temp;
}

export function getTotalFileLength() {
  let len = 4;
  len += getRaceLoopFinishLineTexturesUrl().length;

  len += getRaceLoopRocketTexturesUrl("a").length * 10;
  len += getFinalRocketTexturesUrl("a").length * 10;
  len += getFinishRocketTexturesUrl("a").length * 10;

  return len;
}

function numToString(num = 0, count = 3) {
  let str = num.toString();

  return str.padStart(count, "0");
}
