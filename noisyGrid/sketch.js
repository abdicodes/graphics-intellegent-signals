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
  stroke(0)
  fill(255)
  for (i = 0; i < 25; i++) {
    for (j = 0; j < 25; j++) {
      rect(i * stepSize, j * stepSize, stepSize, stepSize)
    }
  }
  pop()
}
///////////////////////////////////////////////////////////////////////
function compassGrid() {
  // your code here
}
