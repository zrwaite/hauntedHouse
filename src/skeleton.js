import Pumpkin from "./pumpkin.js"

export default class Skeleton {
  constructor(game, pos) {
    this.images = {
      left: document.getElementById("img-skeletonL"),
      right: document.getElementById("img-skeletonR"),
      dead: document.getElementById("img-skeletonD")
    }
    this.image = this.images.left
    this.gameWidth = game.width
    this.gameHeight = game.height
    this.pos = pos
    this.game = game
    this.dead = false //ish
    this.width = 60
    this.height = 120
    this.pumpkin = this.game.pumpkin.wait
    this.wait = Math.floor(Math.random() * this.pumpkin);
    this.speed = 0
    this.gravity = this.game.gravity*0.1
  }
  detector(sprite, block){
    if (sprite.pos.y + sprite.height > block.pos.y && sprite.pos.y < block.pos.y + block.height && sprite.pos.x + sprite.width > block.pos.x && sprite.pos.x < block.pos.x + block.width){
      this.dead = true
      this.image = this.images.dead
      this.height = 50
    }
  }
  update() {
    if (!this.dead) {
      this.detector(this.game.sprite, this)
      this.wait += 1
      if (this.wait%this.pumpkin === 0){
        this.game.pumpkins.push(new Pumpkin(this.game, {x:this.pos.x+30, y: this.pos.y+80}))
      }
      if (this.wait%100===0){
        this.image = this.images.left
      } else if (this.wait%50===0){
        this.image = this.images.right
      }
    }

    this.speed += this.gravity
    this.pos.y += this.speed
    if (this.pos.y + this.height > this.gameHeight) {
      this.pos.y = this.gameHeight - this.height
    } else if (this.pos.y < 0){
      this.pos.y = 0
    }
  }
  draw(ctx) {
    if (this.pos != null) {
      ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height)
    }
  }
}
