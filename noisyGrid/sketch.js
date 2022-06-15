var stepSize = 20

function setup() {
  createCanvas(500, 500)
}
///////////////////////////////////////////////////////////////////////
function draw() {
  background(125)

  colorGrid()
  compassGrid()
}
///////////////////////////////////////////////////////////////////////
function colorGrid() {
  // your code here
  push()
  // stroke(0)
  let green = color('green')
  let red = color('red')
  for (i = 0; i < 25; i++) {
    for (j = 0; j < 25; j++) {
      let mouse_pos = map(mouseX, 0, width, 0, 100)
      let speed = (frameCount * mouse_pos) / 1000
      let n = noise(i / 50, j / 50, speed)
      let interCol = lerpColor(green, red, n)
      fill(interCol)
      noStroke()
      rect(i * stepSize, j * stepSize, stepSize, stepSize)
    }
  }
  pop()
}
///////////////////////////////////////////////////////////////////////
function compassGrid() {
  // your code here
  for (i = 0; i < 25; i++) {
    for (j = 0; j < 25; j++) {
      push()
      translate(stepSize / 2, 0)
      let mouse_pos = map(mouseX, 0, width, 0, 100)
      let speed = (frameCount * mouse_pos) / 10000
      let n = noise(i / 50, j / 50, speed)
      let c = map(n, 0, 1, 0, 720)

      push()
      angleMode(DEGREES)
      translate(i * stepSize, j * stepSize)

      rotate(c)
      fill(0)
      line(0, 0, 0, stepSize)
      pop()
      pop()
    }
  }
}
