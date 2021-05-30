export default class Ghost {
  constructor(game, pos) {
    this.images = {
      left: document.getElementById("img-ghostL"),
      right: document.getElementById("img-ghostR")
    }
    this.image = this.images.left
    this.gameWidth = game.width
    this.gameHeight = game.height
    this.pos = pos
    this.game = game
    this.width = this.game.sprite.width
    this.height = this.game.sprite.height
    this.speed = 1
    this.maxSpeed = 1
    this.wait = 0
  }
  detector(sprite, block){
    if (sprite.pos.y + sprite.height > block.pos.y && sprite.pos.y < block.pos.y + block.height && sprite.pos.x + sprite.width > block.pos.x && sprite.pos.x < block.pos.x + block.width){
      this.game.lives -= 1
      this.game.start()
    }
  }
  update() {
    if (this.pos != null) {
      this.detector(this.game.sprite, this)
      this.pos.y += this.speed
      this.wait += 1
      if (this.wait%100===0){
        this.image = this.images.left
      } else if (this.wait%50===0){
        this.image = this.images.right
      }
    }
    if (this.pos.y + this.height > this.gameHeight) {
      this.pos.y = this.gameHeight - this.height
      this.speed = -this.maxSpeed
    } else if (this.pos.y < 0){
      this.pos.y = 0
      this.speed = this.maxSpeed
    }
  }
  draw(ctx) {
    if (this.pos != null) {
      ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height)
    }
  }
}
