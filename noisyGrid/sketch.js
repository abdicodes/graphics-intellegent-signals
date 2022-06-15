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
      let n = noise(i / 50, j / 50, frameCount / 100)
      let interA = lerpColor(green, red, n)

      fill(interA)
      noStroke()
      rect(i * stepSize, j * stepSize, stepSize, stepSize)
    }
  }
  pop()
}
///////////////////////////////////////////////////////////////////////
function compassGrid() {
  // your code here
}
