// 1

export function getIntroTexturesUrl() {
  const temp = [];
  for (let index = 0; index <= 178; index += 2) {
    temp.push(`assets/img/intro/intro-${numToString(index, 3)}.jpg`);
  }

  return temp;
}


// 2
export function getRaceLoopTexturesUrl() {
  const temp = [];
  for (let index = 0; index <= 238; index += 2) {
    temp.push(
      `assets/img/race-loop/back/racetrack-${numToString(index, 3)}.jpg`
    );
  }
  return temp;
}

export function getRaceLoopRocketTexturesUrl(name: string) {
  // a b c ...

  const temp = [];
  for (let index = 1; index <= 59; index += 2) {
    temp.push(
      `assets/img/race-loop/rockets/rocket-${name}-${numToString(index, 2)}.png`
    );
  }
  return temp;
}

export function getRaceLoopFinishLineTexturesUrl() {
  const temp = [];
  for (let index = 0; index <= 186; index += 2) {
    temp.push(
      `assets/img/race-loop/finishLine/finishline-${numToString(index, 4)}.png`
    );
  }
  return temp;
}


// 3



export function getFinishBackTexturesUrl() {
  const temp = [];
  for (let index = 0; index <= 62; index += 2) {
    temp.push(
      `assets/img/finish/back/finish-background-${numToString(index, 2)}.jpg`
    );
  }
  return temp;
}

export function getFinishRocketTexturesUrl(name: string) { // a b c d...j
  const temp = [];
  for (let index = 1; index <= 59; index += 2) {
    temp.push(
      `assets/img/finish/rockets/rocket-${name}-finish-${numToString(index, 4)}.png`
    );
  }
  return temp;
}


// 4


export function getFinalBackTexturesUrl() {
  const temp = [];
  for (let index = 0; index <= 118; index += 2) {
    temp.push(
      `assets/img/final/back/placement-background_${numToString(index, 3)}.jpg`
    );
  }
  return temp;
}

export function getFinalRocketTexturesUrl(name: string) { // a b c d...j
  const temp = [];
  for (let index = 1; index <= 119; index += 2) {
    temp.push(
      `assets/img/final/rockets/rocket-${name}-placement-${numToString(index, 4)}.png`
    );
  }
  return temp;
}


export function getTotalFileLength(){
  let len = 0
  len += getIntroTexturesUrl().length
  len += getFinalBackTexturesUrl().length
  len += getFinishBackTexturesUrl().length
  len += getRaceLoopFinishLineTexturesUrl().length
  len += getRaceLoopTexturesUrl().length

  len += getRaceLoopRocketTexturesUrl("a").length * 10
  len += getFinalRocketTexturesUrl("a").length * 10
  len += getFinishRocketTexturesUrl("a").length * 10

  return len
}





function numToString(num = 0, count = 3) {
  let str = num.toString();

  return str.padStart(count, "0");
}
