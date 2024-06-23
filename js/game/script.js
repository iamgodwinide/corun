import { updateGround, setupGround } from "./ground.js"
import { updateDino, setupDino, getDinoRect, setDinoLose } from "./dino.js"
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js"

const worldElem = document.querySelector("[data-world]")
const scoreElem = document.querySelector("[data-score]")
const hiScoreElem = document.querySelector(".hiscore")
const startScreenElem = document.querySelector("[data-start-screen]")

// sounds
const bgsound = document.querySelector("#bgsound");
const bgsound2 = document.querySelector("#bgsound2");
const fail = new Audio("/audio/fail.mp3")

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 40
const SPEED_SCALE_INCREASE = 0.00001

let lastTime
let speedScale
let score = 0;
let hiscore = window.localStorage.getItem("hiscore") || 0;


setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, { once: true })
document.addEventListener("touchstart", handleStart, { once: true })


function update(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  const delta = time - lastTime

  updateGround(delta, speedScale, score);
  updateDino(delta, speedScale)
  updateCactus(delta, speedScale)
  updateSpeedScale(delta)
  updateScore(delta)
  if (checkLose()) return handleLose()

  lastTime = time
  window.requestAnimationFrame(update)
}

function checkLose() {
  const dinoRect = getDinoRect()
  return getCactusRects().some(rect => isCollision(rect, dinoRect))
}

function isCollision(rect1, rect2) {
  return (
    (rect1.left + (0.2 * rect1.left)) < rect2.right &&
    (rect1.top) < rect2.bottom &&
    (rect1.right - 50) > rect2.left &&
    rect1.bottom > rect2.top
  )
}


function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE
}

function updateScore(delta) {
  score += delta * 0.01
  scoreElem.textContent = Math.floor(score)
}

function handleStart() {
  handleSave();
  // play sound
  bgsound.volume = 0.4
  bgsound.play();
  lastTime = null
  speedScale = 1
  score = 0
  setupGround()
  setupDino()
  setupCactus()
  startScreenElem.classList.add("hide")
  window.requestAnimationFrame(update);
}

async function handleSave() {
  const url = 'http://localhost:3421/api/save-score';
  const address = localStorage.getItem("user_wallet");
  const username = localStorage.getItem("user_twitter");
  const data = {
    score: score || hiscore,
    address,
    username
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function handleLose() {
  bgsound.pause();
  bgsound2.pause();
  fail.play();
  setDinoLose();
  let hiscore = window.localStorage.getItem("hiscore") || 0;
  if (score > hiscore) {
    window.localStorage?.setItem("hiscore", Math.floor(score));
    hiScoreElem.innerText = Math.floor(score);
    // send data to server
    handleSave();
  }
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true })
    document.addEventListener("touchstart", handleStart, { once: true })
    startScreenElem.classList.remove("hide")
  }, 100)
}

function setPixelToWorldScale() {

  hiScoreElem.innerText = hiscore;

  let worldToPixelScale
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT
  }

  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`

}
