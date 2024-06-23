import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.05;
const groundElems = document.querySelectorAll("[data-ground]");
const backgroundImageElem = document.querySelector("#background");

// const levelupSound = new Audio("/audio/levelup.m4a");
const bgsound = document.querySelector("#bgsound");
const bgsound2 = document.querySelector("#bgsound2");


const grounds = [
  "/imgs/[desert] slow bg.png",
  "/imgs/[desert] fast bg.png"
];

const backgrounds = [
  "/imgs/[desert] static bg.png"
]

const LEVEL2 = 300;
const LEVEL3 = 600;
const LEVEL4 = 900;
const LEVEL5 = 1200;
const LEVEL6 = 1500;
const LEVEL7 = 1800;
const LEVEL8 = 2100;
const LEVEL9 = 2400;
const LEVEL10 = 2700;
const LEVEL11 = 3000;

// let soundLevels = {
//   level2: false,
//   level3: false,
//   level4: false,
//   level5: false,
//   level6: false,
//   level7: false,
//   level8: false,
//   level9: false,
//   level10: false
// }

export function setupGround() {
  groundElems.forEach(ground => {
    ground.src = grounds[0];
  });
  backgroundImageElem.src = backgrounds[0]
  setCustomProperty(groundElems[0], "--left", 0)
  setCustomProperty(groundElems[1], "--left", 100)
}


export function updateGround(delta, speedScale, score) {
  groundElems.forEach(ground => {
    incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1)

    if (getCustomProperty(ground, "--left") <= - 100) {
      if (score > LEVEL2) {
        // if ((score < LEVEL3) && !soundLevels.level2) {
        //   levelupSound.play();
        //   soundLevels.level2 = true;
        // }
        bgsound.pause();
        bgsound2.play();
      }
      if (score > LEVEL3) {
        ground.src = grounds[3];
      }
      if (score > LEVEL4) {
        ground.src = grounds[1];
      }
      if (score > LEVEL5) {
        ground.src = grounds[2];
      }
      if (score > LEVEL6) {
        ground.src = grounds[3];
      }
      if (score > LEVEL7) {
        ground.src = grounds[1];
      }
      if (score > LEVEL8) {
        ground.src = grounds[2];
      }
      if (score > LEVEL9) {
        ground.src = grounds[3];
      }
      if (score > LEVEL10) {
        ground.src = grounds[1];
      }
      incrementCustomProperty(ground, "--left", 200)
    }
  })
}
