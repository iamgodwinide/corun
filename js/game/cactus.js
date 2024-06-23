import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const worldElem = document.querySelector("[data-world]")


const SPEED = 0.05
const CACTUS_INTERVAL_MIN = 1100
const CACTUS_INTERVAL_MAX = 2000
const FRAME_TIME = 100
const CATCUS_FRAME_COUNT = 2


let currentFrameTime
let cactusFrame


const obstacles = [
  "trump-1",
  "flying berserk covid",
  "wall",
  "flying dildo",
  "sharks",
  "flying sexy ghost",
  "shit",
  "doggrun-1",
  "flying cool covid",
  "signs",
  "flying retard covid",
  "dip",
  "flying clown balloon"
];

let nextCactusTime
export function setupCactus() {
  nextCactusTime = CACTUS_INTERVAL_MIN
  currentFrameTime = 0
  cactusFrame = 0
  document.querySelectorAll("[data-cactus]").forEach(cactus => {
    cactus.remove()
  })
}

export function updateCactus(delta, speedScale) {
  document.querySelectorAll("[data-cactus]").forEach(cactus => {

    if (cactus.src.includes("-1") || cactus.src.includes("-2")) {
      if (currentFrameTime >= FRAME_TIME) {
        cactusFrame = (cactusFrame + 1) % CATCUS_FRAME_COUNT
        cactus.src = `${cactus.src.replace("-1", "-" + (cactusFrame + 1)).replace("-2", "-" + (cactusFrame + 1))}`
        currentFrameTime -= FRAME_TIME
      }
      currentFrameTime += delta * speedScale

      incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * 1.1 * -1)
      if (getCustomProperty(cactus, "--left") <= -100) {
        cactus.remove()
      }
    }

    else {
      incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1)
      if (getCustomProperty(cactus, "--left") <= -100) {
        cactus.remove()
      }
    }

  })

  if (nextCactusTime <= 0) {
    createCactus()
    nextCactusTime =
      randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
  }
  nextCactusTime -= delta
}

export function getCactusRects() {
  return [...document.querySelectorAll("[data-cactus]")].map(cactus => {
    return cactus.getBoundingClientRect()
  })
}

function createCactus() {
  const cactus = document.createElement("img")
  cactus.dataset.cactus = true;
  const randomObs = obstacles[Math.floor(Math.random() * obstacles.length)];
  cactus.src = `imgs/${randomObs}.png`
  if (randomObs.includes("flying")) {
    cactus.classList.add("flying-cactus")
  }
  else {
    cactus.classList.add("cactus")
  }
  setCustomProperty(cactus, "--left", 100)
  worldElem.append(cactus)
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
