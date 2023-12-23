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
    if(millisecondsPart == 1000) millisecondsPart = 999
  
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${millisecondsPart.toString().padStart(3, '0')}`;
  }
