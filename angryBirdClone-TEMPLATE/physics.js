////////////////////////////////////////////////////////////////
function setupGround() {
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true,
    angle: 0,
  })
  World.add(engine.world, [ground])
}

////////////////////////////////////////////////////////////////
function drawGround() {
  push()
  fill(128)
  drawVertices(ground.vertices)
  pop()
}
////////////////////////////////////////////////////////////////
function setupPropeller() {
  // your code here
  propeller = Bodies.rectangle(150, 480, 200, 15, {
    isStatic: true,
    angle: angle,
  })
  World.add(engine.world, [propeller])
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller() {
  push()
  // your code here
  drawVertices(propeller.vertices)
  pop()

  Body.setAngle(propeller, angle)
  Body.setAngularVelocity(propeller, angleSpeed)
  angle += angleSpeed
}
////////////////////////////////////////////////////////////////
function setupBird() {
  var bird = Bodies.circle(mouseX, mouseY, 20, {
    friction: 0,
    restitution: 0.95,
  })
  Matter.Body.setMass(bird, bird.mass * 10)
  World.add(engine.world, [bird])
  birds.push(bird)
}
////////////////////////////////////////////////////////////////
function drawBirds() {
  push()
  //your code here
  birds.forEach((bird) => drawVertices(bird.vertices))
  pop()
  for (i = 0; i < birds.length; i++) {
    if (isOffScreen(birds[i])) {
      removeFromWorld(birds[i])
      birds.splice(i, 1)
      i--
    }
  }
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower() {
  //you code here
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 6; j++) {
      var box = Bodies.rectangle(width / 2 + i * 80, 100 + 80 * j, 80, 80)
      boxes.push(box)
      World.add(engine.world, [box])
      colors.push(round(random(60, 200)))
    }
  }
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower() {
  push()
  //your code here

  for (i = 0; i < boxes.length; i++) {
    fill(0, colors[i], 0)
    drawVertices(boxes[i].vertices)
    if (isOffScreen(boxes[i])) {
      boxes.splice(i, 1)
      i--
    }
  }
  pop()
}
////////////////////////////////////////////////////////////////
function setupSlingshot() {
  //your code here
  slingshotBird = Bodies.circle(200, 200, 20, {
    friction: 0,
    restitution: 0.95,
  })
  Matter.Body.setMass(slingshotBird, slingshotBird.mass * 10)

  slingshotConstraint = Constraint.create({
    pointA: { x: 200, y: 200 },
    bodyB: slingshotBird,
    pointB: { x: 0, y: 0 },
    stiffness: 0.01,
    damping: 0.0001,
  })
  World.add(engine.world, [slingshotBird, slingshotConstraint])
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot() {
  push()
  drawVertices(slingshotBird.vertices)
  drawConstraint(slingshotConstraint)
  // your code here
  pop()
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction() {
  var mouse = Mouse.create(canvas.elt)
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 },
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams)
  mouseConstraint.mouse.pixelRatio = pixelDensity()
  World.add(engine.world, mouseConstraint)
}
