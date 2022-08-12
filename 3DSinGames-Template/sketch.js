function setup() {
  createCanvas(900, 800, WEBGL);
}

function draw() {
  background(125);
  angleMode(DEGREES);
  camera(800, -600, 800, 0, 0, 0, 0, 1, 0);
  fill(255);
  for (var i = -400; i < 400; i += 50) {
    for (var j = -400; j < 400; j += 50) {
      push();
      translate(i, 0, j);
      box(50, 50, 50);
      pop();
    }
  }
}
