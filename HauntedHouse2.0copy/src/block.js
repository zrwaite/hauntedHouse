export default class Block {
  constructor(game, pos) {
    this.image = document.getElementById("img-block")
    this.gameWidth = game.width
    this.gameHeight = game.height
    this.pos = pos
    this.width = this.gameWidth/20
    this.height = this.gameHeight/15
    this.game = game
  }
  detector(sprite, block){
    if (sprite.pos.y + sprite.height > block.pos.y && sprite.pos.y < block.pos.y + block.height && sprite.pos.x + sprite.width > block.pos.x && sprite.pos.x < block.pos.x + block.width){
      let dl = sprite.pos.x+sprite.width-block.pos.x
      let dr = block.pos.x+block.width-sprite.pos.x
      let dt = sprite.pos.y+sprite.height-block.pos.y
      let db = block.pos.y+block.height-sprite.pos.y
      if (dl<dt && dl< db){
        return "left"
      } else if (dr<dt && dr<db){
        return "right"
      } else if (dt<db){
        return "top"
      } else{
        return "bottom"
      }
    }
    return false
  }
  personDetector(sprite){
    let person = this.detector(sprite, this)
    if (person==="top"){
      sprite.pos.y = this.pos.y - sprite.height
      sprite.speed.y = 0;
      if (!sprite.moving){
        sprite.friction = sprite.blockFriction
      }
      sprite.jumping = false
    } else if (person==="bottom"){
      sprite.pos.y = this.pos.y + this.height
      sprite.speed.y = 0
    } else if (person==="left"){
      sprite.pos.x = this.pos.x - sprite.width
    } else if (person==="right"){
      sprite.pos.x = this.pos.x + this.width
    }
  }
  ghostDetector(sprite){
    let ghost = this.detector(sprite, this)
    if (ghost==="top"){
      sprite.speed = -sprite.maxSpeed
    } else if (ghost==="bottom"){
      sprite.speed = sprite.maxSpeed
    }
  }
  skeletonDetector(sprite){
    let skeleton = this.detector(sprite, this)
    if (skeleton==="top"){
      sprite.speed = 0
      sprite.pos.y = this.pos.y-sprite.height
    }
  }
  pumpkinDetector(sprite){
    let pumpkin = this.detector(sprite, this)
    if (pumpkin==="top"){
      sprite.pos.y = this.pos.y - sprite.height
      sprite.speed.y = 0;
    } else if (pumpkin==="left"){
      sprite.pos.x = this.pos.x - sprite.width
      sprite.speed.x = -sprite.speed.max
      sprite.dir = -1
    } else if (pumpkin==="right"){
      sprite.pos.x = this.pos.x + this.width
      sprite.speed.x = sprite.speed.max
      sprite.dir = 1
    }
  }
  update() {
    if (this.pos != null) {
      this.personDetector(this.game.sprite)
      this.game.ghosts.forEach((object) => this.ghostDetector(object))
      this.game.skeletons.forEach((object) => this.skeletonDetector(object))
      this.game.pumpkins.forEach((object) => this.pumpkinDetector(object))
    }
  }
  draw(ctx) {
    if (this.pos != null) {
      ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height)
    }
  }
}
