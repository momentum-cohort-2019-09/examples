import { Circle, Polygon, Result } from 'collisions'
import deadSound from './dead.mp3'

const colors = {
  sky: '#B8DBD9',
  ground: '#3F7D20',
  person: '#D7263D',
  obstacle: '#FFBA49',
  cloud: '#EBEBD3'
}

export class Game {
  constructor (canvasId) {
    const canvas = document.getElementById(canvasId)
    this.screen = canvas.getContext('2d')
    this.size = { width: canvas.width, height: canvas.height }
    this.groundY = Math.floor(this.size.height * 0.8)
    this.runningSpeed = 4
    this.bodies = []
    this.ticksSinceObstacle = 0
    this.keyboard = new Keyboarder()
    this.gameOver = false
    this.deadSound = new Audio(deadSound)

    let playerSize = {
      width: 20,
      height: 20
    }

    let playerLocation = {
      x: Math.floor(this.size.width * 0.2),
      y: this.groundY - (playerSize.height / 2) - 2
    }

    this.player = new Player(playerLocation, playerSize)
    this.addBody(this.player)
  }

  addBody (body) {
    this.bodies.push(body)
  }

  run () {
    const tick = () => {
      this.update()
      this.draw()

      if (!this.gameOver) {
        window.requestAnimationFrame(tick)
      }
    }

    tick()
  }

  addObstacle () {
    this.addBody(new Obstacle({ x: this.size.width, y: this.groundY - 15 }, { width: 30, height: 30 }))
  }

  throwBall () {
    this.addBody(new Ball({ x: this.size.width, y: this.groundY - 35 }, 20, Math.random() * 2))
  }

  addCloud () {
    const cloudCenter = { x: this.size.width, y: Math.floor(Math.random() * this.size.height / 2) }
    const cloudSize = { width: Math.random() * 100 + 10, height: Math.random() * 50 + 10 }
    this.addBody(new Cloud(cloudCenter, cloudSize))
  }

  update () {
    // console.log(this.bodies.length)

    const obstacleOccurPercentage = this.ticksSinceObstacle * 0.0001

    if (Math.random() < obstacleOccurPercentage) {
      this.addObstacle()
      this.ticksSinceObstacle = 0
    } else {
      this.ticksSinceObstacle++
    }

    if (Math.random() < 0.01) {
      this.throwBall()
    }

    if (Math.random() < 0.01) {
      this.addCloud()
    }

    for (let body of this.bodies) {
      body.update(this)
      const result = new Result()
      if (body !== this.player && !body.safe && this.player.toShape().collides(body.toShape(), result)) {
        this.gameOver = true
        this.deadSound.play()
      }
    }

    // ??? FIXME
    this.bodies = this.bodies.filter(bodyOnScreen)
  }

  draw () {
    let skyHeight = Math.floor(this.size.height * 0.8)
    let groundHeight = this.size.height - skyHeight
    this.screen.fillStyle = colors.sky
    this.screen.fillRect(0, 0, this.size.width, skyHeight)

    this.screen.fillStyle = colors.ground
    this.screen.fillRect(0, skyHeight, this.size.width, groundHeight)

    for (let body of this.bodies) {
      body.draw(this.screen)
    }
  }
}

class Player {
  constructor (center, size) {
    this.center = center
    this.size = size
    this.startingY = center.y
    this.velocityY = 0
    this.jumping = false
    this.jumpSound = document.querySelector('#jump-sound')
  }

  update (game) {
    this.center.y -= this.velocityY

    if (this.jumping) {
      this.velocityY -= 1
      if (this.center.y >= this.startingY) {
        this.center.y = this.startingY
        this.velocityY = 0
        this.jumping = false
      }
    }

    if (game.keyboard.isDown(Keyboarder.KEYS.SPACE) && !this.jumping) {
      this.jumpSound.play()
      this.jumping = true
      this.velocityY = 15
    }
  }

  draw (screen) {
    screen.fillStyle = colors.person
    screen.fillRect(
      this.center.x - (this.size.width / 2),
      this.center.y - (this.size.height / 2),
      this.size.width, this.size.height)
  }

  toShape () {
    return new Polygon(this.center.x, this.center.y,
      [[-(this.size.width / 2), -(this.size.height / 2)],
        [(this.size.width / 2), -(this.size.height / 2)],
        [(this.size.width / 2), (this.size.height / 2)],
        [-(this.size.width / 2), (this.size.height / 2)]
      ])
  }
}

class Obstacle {
  constructor (center, size) {
    this.center = center
    this.size = size
  }

  update (game) {
    this.center.x -= game.runningSpeed
  }

  draw (screen) {
    screen.fillStyle = colors.obstacle
    screen.fillRect(
      this.center.x - (this.size.width / 2),
      this.center.y - (this.size.height / 2),
      this.size.width, this.size.height)
  }

  toShape () {
    return new Polygon(this.center.x, this.center.y,
      [[-(this.size.width / 2), -(this.size.height / 2)],
        [(this.size.width / 2), -(this.size.height / 2)],
        [(this.size.width / 2), (this.size.height / 2)],
        [-(this.size.width / 2), (this.size.height / 2)]
      ])
  }
}

export class Ball {
  constructor (center, diameter, velocityX) {
    this.center = center
    this.diameter = diameter
    this.velocityX = velocityX
    this.size = { width: diameter, height: diameter }
  }

  update (game) {
    this.center.x -= game.runningSpeed + this.velocityX
  }

  draw (screen) {
    screen.fillStyle = colors.obstacle
    screen.beginPath()
    screen.arc(
      this.center.x,
      this.center.y,
      this.diameter / 2,
      0,
      2 * Math.PI)
    screen.fill()
    screen.closePath()
  }

  toShape () {
    return new Circle(this.center.x, this.center.y, this.diameter / 2)
  }
}

class Cloud {
  constructor (center, size) {
    this.center = center
    this.size = size
    this.safe = true
  }

  update (game) {
    this.center.x -= game.runningSpeed / 2
  }

  draw (screen) {
    screen.fillStyle = colors.cloud
    screen.fillRect(
      this.center.x - (this.size.width / 2),
      this.center.y - (this.size.height / 2),
      this.size.width, this.size.height)
  }
}

class Keyboarder {
  constructor () {
    this.keyState = {}

    window.addEventListener('keydown', function (e) {
      this.keyState[e.keyCode] = true
    }.bind(this))

    window.addEventListener('keyup', function (e) {
      this.keyState[e.keyCode] = false
    }.bind(this))
  }

  isDown (keyCode) {
    return this.keyState[keyCode] === true
  }

  on (keyCode, callback) {
    window.addEventListener('keydown', function (e) {
      if (e.keyCode === keyCode) {
        callback()
      }
    })
  }
}

function bodyOnScreen (body) {
  return body.center.x > 0 - body.size.width
}

Keyboarder.KEYS = { LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40, S: 83, SPACE: 32 }
