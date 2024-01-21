// export const usernames = [
//   "QuantumQuasar",
//   "MysticMarauder",
//   "NebulaNomad",
//   "CelestialCipher",
//   "RogueRhapsody",
//   "SereneSpectre",
//   "LunarLabyrinth",
//   "EtherealEnigma",
//   "CipherSeeker",
//   "ZenithZephyr",
// ];

export const usernames = [
  "QuantumQuasar",
  "MysticMarauder",
  "NebulaNomad",
  "CelestialCipher",
  "RogueRhapsody",
  "SereneSpectre",
  "LunarLabyrinth",
  "EtherealEnigma",
  "CipherSeeker",
  "ZenithZephyr",
];

export function calculateElapsedTime(startMilliseconds: number) {
  const currentMilliseconds = new Date().getTime();
  const elapsedMilliseconds = currentMilliseconds - startMilliseconds;

  const totalSeconds = Math.floor(elapsedMilliseconds / 1000);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  let millisecondsPart = elapsedMilliseconds % 1000;
  if (millisecondsPart == 1000) millisecondsPart = 999;

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}.${millisecondsPart.toString().padStart(3, "0")}`;
}

export function isLowResolution() {
  /* Storing user's device details in a variable*/
  let details = navigator.userAgent;

  /* Creating a regular expression  
  containing some mobile devices keywords  
  to search it in details string
  */
  let regexp = /android|iphone|kindle|ipad/i;

  /* Using test() method to search regexp in details 
  it returns boolean value
  */
  let isMobileDevice = regexp.test(details);

  return isMobileDevice;
  // if (isMobileDevice) {
  //   console.log("You are using a Mobile Device");
  // } else {
  //   console.log("You are using Desktop");
  // }
}
