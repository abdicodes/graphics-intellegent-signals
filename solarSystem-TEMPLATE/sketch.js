var speed

function setup() {
  createCanvas(900, 700)
}

function draw() {
  background(0)
  speed = frameCount

  push()
  translate(width / 2, height / 2)

  push()
  rotate(radians(speed / 3))
  celestialObj(color(255, 150, 0), 200) // SUN
  pop()

  push()
  rotate(radians(speed))
  translate(300, 0)
  push()
  rotate(radians(speed))
  celestialObj('blue', 80) // Earth
  pop()
  push()
  rotate(radians(-2 * speed)) // inner and outter rou
  translate(100, 0)
  celestialObj('white', 30) // White Moon
  push()
  fill('pink')
  rotate(radians(-2 * speed))
  translate(30, 0)
  ellipse(0, 0, 10)
  pop()

  pop()
  pop()

  pop()
}

function celestialObj(c, size) {
  strokeWeight(5)
  fill(c)
  stroke(0)
  ellipse(0, 0, size, size)
  line(0, 0, size / 2, 0)
}
