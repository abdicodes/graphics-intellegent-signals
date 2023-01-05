var mySound;
var playStopButton;
var jumpButton;
var sliderVolume;
var sliderRate;
var sliderPan;

var fft;
var shapeSize,
  shapeNum,
  shapeColour,
  borderSize,
  borderColour,
  shapeOpacity,
  borderOpacity,
  shapeRotation,
  backgrouColourFeature,
  backgrouColour;

var rms,
  zcr,
  energy,
  spectralCentroid,
  spectralFlatness,
  spectralRolloff,
  perceptualSpread,
  perceptualSharpness,
  spectralSlope;
var sizes;
var myRec;

function preload() {
  soundFormats('wav', 'mp3');
  mySound = loadSound('sounds/Kalte_Ohren_(_Remix_).mp3');
}

function setup() {
  myRec = new p5.SpeechRec('en-US'); // speech recognition object (will prompt for mic access)
  myRec.continuous = true;

  myRec.onResult = showResult; // bind callback function to trigger when speech is recognized
  myRec.start(); // start listening

  sizes = [100, 130, 60, 120, 80, 100];
  shapeNum = 4;
  shapeColour =
    borderSize =
    borderColour =
    shapeOpacity =
    borderOpacity =
    shapeRotation =
    backgrouColourFeature =
      0;

  if (typeof Meyda === 'undefined') {
    console.log('Meyda could not be found! Have you included it?');
  } else {
    const analyzer = Meyda.createMeydaAnalyzer({
      audioContext: getAudioContext(),
      source: mySound,
      bufferSize: 512,
      featureExtractors: [
        'rms',
        'zcr',
        'energy',
        'spectralCentroid',
        'spectralFlatness',
        'spectralRolloff',
        'perceptualSpread',
        'perceptualSharpness',
        'spectralSlope',
      ],
      callback: (features) => {
        rms = features.rms * 100;
        zcr = features.zcr;
        energy = features.energy * 10;
        spectralCentroid = features.spectralCentroid * 5;
        spectralFlatness = features.spectralFlatness * 1000;
        spectralRolloff = features.spectralRolloff / 100;
        perceptualSpread = features.perceptualSpread * 100;
        perceptualSharpness = features.perceptualSharpness * 100;
        spectralSlope = features.spectralSlope * 20000000;
      },
    });
    analyzer.start();
  }
  createCanvas(800, 600);
  background(180);

  playStopButton = createButton('play');
  playStopButton.position(200, 20);
  playStopButton.mousePressed(playStopSound);
  jumpButton = createButton('jump');
  jumpButton.position(250, 20);
  jumpButton.mousePressed(jumpSong);

  sliderVolume = createSlider(0, 1, 1, 0.01);
  sliderVolume.position(20, 25);
  sliderRate = createSlider(-2, 2, 1, 0.01);
  sliderRate.position(20, 70);
  sliderPan = createSlider(-1, 1, 0, 0.01);
  sliderPan.position(20, 115);

  fft = new p5.FFT(0.2, 2048);
}
function showResult() {
  console.log(myRec.resultString);
  if (myRec.resultString === 'black') {
    backgrouColour = 'black';
  }
  if (myRec.resultString === 'white') {
    backgrouColour = 'white';
  }
  if (myRec.resultString === 'red') {
    backgrouColour = 'red';
  }
  if (myRec.resultString === 'blue') {
    backgrouColour = 'blue';
  }
  if (myRec.resultString === 'green') {
    backgrouColour = 'green';
  }
}

function draw() {
  if (perceptualSharpness && !backgrouColour) {
    backgrouColourFeature = map(perceptualSharpness, 50, 70, 120, 200);
    background(backgrouColourFeature, 100, 100);
  }
  if (backgrouColour) background(backgrouColour);

  fill(0);
  text('volume', 80, 20);
  text('rate', 80, 65);
  text('pan', 80, 110);

  let vol = Math.pow(sliderVolume.value(), 3);
  mySound.setVolume(vol);
  mySound.rate(sliderRate.value());
  mySound.pan(sliderPan.value());

  push();
  if (spectralSlope) shapeNum = round(constrain(spectralSlope, 4, 6));
  for (i = 0; i < shapeNum; i++) {
    if (spectralRolloff) shapeOpacity = map(spectralRolloff, 50, 150, 0, 255);
    if (energy) shapeColour = map(energy, 0, 300, 0, 255);

    shapeSize = sizes[i] + rms;
    if (perceptualSharpness) {
      borderSize = map(perceptualSharpness, 55, 75, 1, 5);
    }
    if (zcr) borderColour = map(zcr, 0, 150, 0, 255);
    if (perceptualSpread) borderOpacity = map(perceptualSpread, 80, 90, 0, 255);
    if (spectralCentroid)
      shapeRotation = map(spectralCentroid, 0, 512, -PI / 8, PI / 2);
    strokeWeight(borderSize);
    stroke(borderColour, borderColour, i * 42, 80, borderOpacity);
    fill(shapeColour, i * 42, 80, shapeOpacity);
    push();
    translate(i * sizes[i], height / 2);
    rotate(shapeRotation);
    // circle(i * sizes[i] + sizes[i], height / 2, shapeSize);
    rectMode(CENTER);
    rect(0 + sizes[i], 0, shapeSize, shapeSize);

    pop();
  }
  pop();
}

function jumpSong() {
  var dur = mySound.duration();
  var t = random(dur);
  mySound.jump(t);
}

function playStopSound() {
  if (mySound.isPlaying()) {
    mySound.stop();
    playStopButton.html('play');
    background(180);
  } else {
    mySound.loop();
    playStopButton.html('stop');
  }
}
