import Game from "./game.js"

let canvas = document.getElementById("gameScreen")
let ctx = canvas.getContext("2d")

const gameWidth = 800
const gameHeight = 600

let game = new Game(gameWidth, gameHeight)
let background = document.getElementById("img-background")

let lastTime = 0
function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime
  lastTime = timestamp
  ctx.save()
  ctx.globalAlpha = 0.5
  ctx.drawImage(background, 0, 0, gameWidth, gameHeight)
  ctx.restore()
  game.update(deltaTime)
  game.draw(ctx)
  requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)
