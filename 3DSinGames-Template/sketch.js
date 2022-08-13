function setup() {
  createCanvas(900, 800, WEBGL);
}

function draw() {
  background(125);
  angleMode(DEGREES);
  camera(800, -600, 800, 0, 0, 0, 0, 1, 0);
  fill(255);
  normalMaterial();
  stroke(0);
  strokeWeight(2);
  for (var i = -400; i < 400; i += 50) {
    for (var j = -400; j < 400; j += 50) {
      push();
      translate(i, 0, j);
      let distance = dist(0, 0, 0, i, 0, j);
      let length = map(sin(distance + frameCount), -1, 1, 100, 300);
      box(50, length, 50);
      pop();
    }
  }
}
