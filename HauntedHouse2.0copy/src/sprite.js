export default class Person{
  constructor(game){
    this.person = {"s":[document.getElementById("img-personSL"),document.getElementById("img-personSR")],
    "j":[document.getElementById("img-personJL"),document.getElementById("img-personJR")],
    "wl":[document.getElementById("img-personWLL"),document.getElementById("img-personWRL")],
    "wr":[document.getElementById("img-personWLR"),document.getElementById("img-personWRR")]
    }
    this.pirate  = {"s":[document.getElementById("img-pirateSL"),document.getElementById("img-pirateSR")],
    "j":[document.getElementById("img-pirateJL"),document.getElementById("img-pirateJR")],
    "wl":[document.getElementById("img-pirateWLL"),document.getElementById("img-pirateWRL")],
    "wr":[document.getElementById("img-pirateWLR"),document.getElementById("img-pirateWRR")]
    }
    this.face = {
      left: 0,
      right: 1
    }
    this.images = this.person
    this.dir = this.face.right
    this.image = this.images["s"][this.dir]
    this.height = 80
    this.width = 50
    this.gravity = game.gravity
    this.blockFriction = game.blockFriction
    this.airFriction = game.airFriction
    this.friction = this.blockFriction
    this.gameWidth = game.width
    this.gameHeight = game.height
    this.legSpeed = 12 //smaller = faster
    this.jumping = false
    this.moving = false
    this.game = game
    this.wait = 0
    this.pos = {
      x:20,
      y:20
    }
    this.speed = {
      x:0,
      y:0,
      maxx:6,
      maxy: 13
    }
    this.reset()
  }
  reset(){
    this.pos.x = 20
    this.pos.y = 20
    this.speed.y = 0
    this.speed.x = 0
  }
  update(deltaTime) {
    if (this.jumping === true){
      this.image = this.images["j"][this.dir]
      this.wait = 0
    } else if (this.moving){
        this.wait += 1
        if (this.wait<this.legSpeed){
          this.image = this.images["wl"][this.dir]
        } else if (this.wait<this.legSpeed*2){
          this.image = this.images["wr"][this.dir]
        } else{
          this.wait = 0
        }
      }
    else {
      this.image = this.images["s"][this.dir]
      this.wait = 0
    }
    if (this.pos.y + this.height === this.gameHeight){
      this.jumping = false
    } else if (this.speed.y !== 0){
      this.jumping = true
    }
    this.pos.x += this.speed.x
    this.pos.y += this.speed.y
    this.speed.y += this.gravity
    if (this.pos.x + this.width > this.gameWidth) {
      this.pos.x = this.gameWidth - this.width
      this.speed.x = 0
    } else if(this.pos.x < 0){
      this.pos.x = 0
      this.speed.x = 0
    }
    if (this.pos.y + this.height > this.gameHeight) {
      this.pos.y = this.gameHeight - this.height
      this.speed.y = 0
    } else if (this.pos.y < 0){
      this.pos.y = 0
      this.speed.y = 0
    }
    this.speed.x *= this.friction
    if (this.moving){
      this.friction = 1
    } else if (this.speed.y === 0){
      this.friction = this.blockFriction
    } else {
      this.friction = this.airFriction
    }
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height)
  }
  left() {
    this.dir = this.face.left
    this.speed.x = -this.speed.maxx
    this.moving = true
    this.friction = 1
  }
  right() {
    this.dir = this.face.right
    this.speed.x = this.speed.maxx
    this.moving = true
    this.friction = 1
  }
  jump() {
    this.speed.y = -this.speed.maxy
    this.jumping = true
  }

}
