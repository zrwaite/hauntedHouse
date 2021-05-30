export default class Fire {
  constructor(game, pos) {
    this.images = {
      0: document.getElementById("img-fire0"),
      1: document.getElementById("img-fire1"),
      2: document.getElementById("img-fire2"),
      3: document.getElementById("img-fire3"),
      4: document.getElementById("img-fire4"),
      5: document.getElementById("img-fire5")
    }
    this.image = this.images[0]
    this.gameWidth = game.width
    this.gameHeight = game.height
    this.pos = pos
    this.width = this.gameWidth/20
    this.height = this.gameHeight/15
    this.game = game
    this.time = 0
    this.wait = 5
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
    }
    this.time += 1
    this.time = this.time%this.wait
    if (this.time===0){
      this.image = this.images[Math.floor(Math.random() * 6)]
    }
  }
  draw(ctx) {
    if (this.pos != null) {
      ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height)
    }
  }
}
