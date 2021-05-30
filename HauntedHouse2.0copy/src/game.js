import Input from "./controller.js"
import Person from "./sprite.js"
import Display from "./display.js"
import Block from "./block.js"
import Pumpkin from "./pumpkin.js"
import { buildObjects, level0, level1, level2, level3, level4, level5, level6} from "./levels.js"

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.width = gameWidth
    this.height = gameHeight
    this.gameObjects = []
    this.gravity = 0.7
    this.blockFriction = 1-(0.3)
    this.airFriction = 1-(0.1)
    this.levels = [level0, level1, level2, level3, level4, level5, level6]
    this.level = 0
    this.lives = 3
    this.objects = []
    this.blocks = []
    this.doors = []
    this.ghosts = []
    this.skeletons = []
    this.fires = []
    this.pumpkins = []
    this.states = {
      start: 0,
      running: 1,
      paused: 2,
      gameover: 3,
      win: 4
    }
    this.state = this.states.start
    this.sprite = new Person(this)
    this.display = new Display(this)
    this.block = new Block(this, null)
    this.pumpkin = new Pumpkin(this, null)
    new Input(this.sprite, this)
  }
  start() {
    if (this.level !== 7){
      this.state = this.states.running
      this.objects = buildObjects(this, this.levels[this.level])
      this.blocks = this.objects[0]
      this.doors = this.objects[1]
      this.ghosts = this.objects[2]
      this.skeletons = this.objects[3]
      this.fires = this.objects[4]
      this.pumpkins = []
      this.sprite.reset()
    }
    else{
      this.state = this.states.win
    }
  }
  update(deltaTime) {
    if (this.lives <=0){
      this.state = this.states.gameover
      return
    }
    if (this.state!==this.states.running)return
    [...this.doors, this.sprite, ...this.blocks, ...this.ghosts, ...this.skeletons, ...this.fires, ...this.pumpkins, this.display].forEach((object) =>object.update(deltaTime))
    this.pumpkins = this.pumpkins.filter((object) => !object.delete)
  }
  draw(ctx) {
    [...this.doors, this.sprite, ...this.blocks, ...this.ghosts, ...this.skeletons, ...this.fires, ...this.pumpkins, this.display].forEach((object) => object.draw(ctx))
  }
  togglePause() {
    if (this.state === this.states.paused) {
      this.state = this.states.running
    } else {
      this.state = this.states.paused
    }
  }
}
