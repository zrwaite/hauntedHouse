export default class Door {
  constructor(game, pos) {
    this.image = document.getElementById("img-door")
    this.gameWidth = game.width
    this.gameHeight = game.height
    this.pos = pos
    this.width = 40
    this.height = 80
    this.game = game
  }
  detector(sprite, block){
    if (sprite.pos.y + sprite.height > block.pos.y && sprite.pos.y < block.pos.y + block.height && sprite.pos.x + sprite.width > block.pos.x && sprite.pos.x < block.pos.x + block.width){
      this.game.level += 1
      this.game.start()
    }
  }
  update() {
    if (this.pos != null) {
      this.detector(this.game.sprite, this)
    }
  }
  draw(ctx) {
    if (this.pos != null) {
      ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height)
    }
  }
}
