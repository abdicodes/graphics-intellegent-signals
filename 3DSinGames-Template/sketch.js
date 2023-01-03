var confLocs = [];
var confTheta = [];
function setup() {
  angleMode(DEGREES);
  createCanvas(900, 800, WEBGL);
  for (let i = 0; i < 200; i++) {
    let vec3d = new p5.Vector(
      random(-500, 500),
      random(-800, 0),
      random(-500, 500)
    );
    confLocs.push(vec3d);
    confTheta.push(random(0, 360));
  }
}

function draw() {
  background(125);

  let xLoc = cos(frameCount) * height;
  let zLoc = sin(frameCount) * height;

  camera(xLoc, -600, zLoc, 0, 0, 0, 0, 1, 0);

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
  confetti();
}

const confetti = () => {
  confLocs.forEach((loc, i) => {
    push();
    translate(loc.x, loc.y, loc.z);
    noStroke();
    rotateX(confTheta[i]);
    plane(15, 15);
    confTheta[i] += 10;
    loc.y += 1;
    loc.y >= 0 ? (loc.y = -800) : null;
    pop();
  });
};
