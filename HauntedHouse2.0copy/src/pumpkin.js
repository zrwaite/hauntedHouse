export default class Pumpkin {
  constructor(game, pos) {
    this.images = {
      0: document.getElementById("img-pumpkin0"),
      90: document.getElementById("img-pumpkin90"),
      180: document.getElementById("img-pumpkin180"),
      270: document.getElementById("img-pumpkin270")
    }
    this.angle = 0
    this.image = this.images[this.angle]
    this.gameWidth = game.width
    this.gameHeight = game.height
    this.pos = pos
    this.game = game
    this.gravity = this.game.gravity*0.1
    this.width = 40
    this.height = 40
    this.wait = 300
    this.turnTime = 10
    this.time = 0
    this.dir = 1
    this.delete = false
    this.speed = {
      x:-3,
      y:0,
      max:3
    }
  }
  detector(sprite, block){
    if (sprite.pos.y + sprite.height > block.pos.y && sprite.pos.y < block.pos.y + block.height && sprite.pos.x + sprite.width > block.pos.x && sprite.pos.x < block.pos.x + block.width){
      this.game.lives -= 1
      this.game.start()
    }
  }
  update() {
    this.time += 1
    if (this.time%this.turnTime===0){
      this.angle-=this.dir
      this.angle = (4+this.angle)%4
      this.image = this.images[this.angle*90]
    }
    if (this.time>this.wait*2){
      this.delete = true
    }
    if (this.pos != null) {
      this.detector(this.game.sprite, this)
      this.speed.y += this.gravity
      this.pos.y += this.speed.y
      this.pos.x += this.speed.x
    }
    if (this.pos.y + this.height > this.gameHeight) {
      this.pos.y = this.gameHeight - this.height
      this.speed.y = 0
    } else if (this.pos.y < 0){
      this.pos.y = 0
      this.speed.y = 0
    }
    if (this.pos.x + this.width > this.gameWidth) {
      this.pos.x = this.gameWidth - this.width
      this.speed.x = -this.speed.max
      this.dir = -1
    } else if(this.pos.x < 0){
      this.pos.x = 0
      this.speed.x = this.speed.max
      this.dir = 1
    }
  }
  draw(ctx) {
    if (this.pos != null) {
      ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height)
    }
  }
}
