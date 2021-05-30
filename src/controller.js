export default class Input {
  constructor(sprite, game) {
    this.leftPressed = false
    this.rightPressed = false
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 65:
          sprite.left()
          this.leftPressed = true
          break
        case 87:
          if (!sprite.jumping){
            sprite.jump()
          }
          break
        case 68:
          sprite.right()
          this.rightPressed = true
          break
        case 80:
          game.togglePause()
          break
        case 32:
          if(game.lives === 0){
            game.lives = 3
          }
          game.start()
          break
      }
    })
    document.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        case 65:
          this.leftPressed = false
          if (!this.rightPressed){
            sprite.moving = false
          }
          break
        case 68:
          this.rightPressed = false
          if (!this.leftPressed){
            sprite.moving = false
          }
          break
      }
    })
  }
}
