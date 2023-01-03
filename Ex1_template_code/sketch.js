// Exercise 1 template
// Feel freee to modify it or create your own template
// playback controls
var pauseButton;
var playButton;
var stopButton;
var skipStartButton;
var skipEndButton;
var loopButton;
var recordButton;

// low-pass filter
var lp_cutOffSlider;
var lp_resonanceSlider;
var lp_dryWetSlider;
var lp_outputSlider;
let lp;

// dynamic compressor
var dc_attackSlider;
var dc_kneeSlider;
var dc_releaseSlider;
var dc_ratioSlider;
var dc_thresholdSlider;
var dc_dryWetSlider;
var dc_outputSlider;
let dc;

// master volume
var mv_volumeSlider;

// reverb
var rv_durationSlider;
var rv_decaySlider;
var rv_dryWetSlider;
var rv_outputSlider;
var rv_reverseButton;
let rv;
let rv_isReverse = false;

// waveshaper distortion
var wd_amountSlider;
var wd_oversampleSlider;
var wd_dryWetSlider;
var wd_outputSlider;
let wd;

let myAudio;
function preload() {
  myAudio = loadSound('twoLines.wav');
}

function setup() {
  createCanvas(800, 600);
  background(180);

  gui_configuration();
  audio_configuration();
  playButton.mousePressed(audio_configuration);
}

function draw() {
  // console.log(lp_resonanceSlider.value());
  lp.freq(lp_cutOffSlider.value());
  lp.amp(lp_outputSlider.value());
  lp.drywet(lp_dryWetSlider.value());
  lp.res(lp_resonanceSlider.value());

  wd.amp(wd_outputSlider.value());
  wd.drywet(wd_dryWetSlider.value());
  wd.set(wd_amountSlider.value(), oversampleParsing());

  dc.amp(dc_outputSlider.value());
  dc.drywet(dc_dryWetSlider.value());
  dc.set(
    dc_attackSlider.value(),
    dc_kneeSlider.value(),
    dc_ratioSlider.value(),
    dc_thresholdSlider.value(),
    dc_releaseSlider.value()
  );
  // rv_reverseButton.mousePressed(() => (isReverse = !isReverse));
  rv.amp(rv_outputSlider.value());
  rv.drywet(rv_dryWetSlider.value());
  myAudio.setVolume(mv_volumeSlider.value());
  console.log(rv_isReverse);
}

function audio_configuration() {
  lp = new p5.Filter('lowpass');
  wd = new p5.Distortion(wd_amountSlider.value(), oversampleParsing());
  dc = new p5.Compressor();

  rv = new p5.Reverb();

  myAudio.disconnect();
  myAudio.connect(lp);
  myAudio.connect(wd);
  myAudio.connect(dc);
  myAudio.connect(rv);

  myAudio.loop();
  myAudio.setVolume(0.5);
}

function oversampleParsing() {
  let x = wd_oversampleSlider.value();
  if (x === 0) return 'none';
  else if (x === 1) return '2x';
  else if (x === 2) return '4x';
  else throw Error('invalid oversample value');
}
function setReverbValues() {
  rv.set(rv_durationSlider.value(), rv_decaySlider.value(), rv_isReverse);
}
function gui_configuration() {
  // Playback controls
  pauseButton = createButton('pause');
  pauseButton.position(10, 20);
  playButton = createButton('play');
  playButton.position(70, 20);
  stopButton = createButton('stop');
  stopButton.position(120, 20);
  skipStartButton = createButton('skip to start');
  skipStartButton.position(170, 20);
  skipEndButton = createButton('skip to end');
  skipEndButton.position(263, 20);
  loopButton = createButton('loop');
  loopButton.position(352, 20);
  recordButton = createButton('record');
  recordButton.position(402, 20);

  // Important: you may have to change the slider parameters (min, max, value and step)

  // low-pass filter
  textSize(14);
  text('low-pass filter', 10, 80);
  textSize(10);

  lp_cutOffSlider = createSlider(0, 10000, 500, 100);
  lp_cutOffSlider.position(10, 110);
  text('cutoff frequency', 10, 105);

  lp_resonanceSlider = createSlider(0.001, 1000, 20, 0.01);
  lp_resonanceSlider.position(10, 155);
  text('resonance', 10, 150);

  lp_dryWetSlider = createSlider(0, 1, 0.5, 0.01);
  lp_dryWetSlider.position(10, 200);
  text('dry/wet', 10, 195);

  lp_outputSlider = createSlider(0, 1, 0.5, 0.01);
  lp_outputSlider.position(10, 245);
  text('output level', 10, 240);

  // dynamic compressor
  textSize(14);
  text('dynamic compressor', 210, 80);
  textSize(10);
  dc_attackSlider = createSlider(0, 1, 0.03, 0.01);
  dc_attackSlider.position(210, 110);
  text('attack', 210, 105);
  dc_kneeSlider = createSlider(0, 40, 30, 0.01);
  dc_kneeSlider.position(210, 155);
  text('knee', 210, 150);
  dc_releaseSlider = createSlider(0, 1, 0.25, 0.01);
  dc_releaseSlider.position(210, 200);
  text('release', 210, 195);
  dc_ratioSlider = createSlider(1, 20, 12, 0.01);
  dc_ratioSlider.position(210, 245);
  text('ratio', 210, 240);
  dc_thresholdSlider = createSlider(-100, 0, -24, 0.1);
  dc_thresholdSlider.position(360, 110);
  text('threshold', 360, 105);
  dc_dryWetSlider = createSlider(0, 1, 0.5, 0.01);
  dc_dryWetSlider.position(360, 155);
  text('dry/wet', 360, 150);
  dc_outputSlider = createSlider(0, 1, 0.5, 0.01);
  dc_outputSlider.position(360, 200);
  text('output level', 360, 195);

  // master volume
  textSize(14);
  text('master volume', 560, 80);
  textSize(10);
  mv_volumeSlider = createSlider(0, 1, 0.5, 0.01);
  mv_volumeSlider.position(560, 110);
  text('level', 560, 105);

  // reverb
  textSize(14);
  text('reverb', 10, 305);
  textSize(10);
  rv_durationSlider = createSlider(0, 10, 3, 0.01);
  rv_durationSlider.position(10, 335);
  rv_durationSlider.mouseReleased(setReverbValues);

  text('duration', 10, 330);
  rv_decaySlider = createSlider(0, 100, 2, 0.01);
  rv_decaySlider.position(10, 380);
  rv_decaySlider.mouseReleased(setReverbValues);

  text('decay', 10, 375);
  rv_dryWetSlider = createSlider(0, 1, 0.5, 0.01);
  rv_dryWetSlider.position(10, 425);
  text('dry/wet', 10, 420);
  rv_outputSlider = createSlider(0, 1, 0.5, 0.01);
  rv_outputSlider.position(10, 470);
  text('output level', 10, 465);
  rv_reverseButton = createButton('reverb reverse');
  rv_reverseButton.position(10, 510);
  rv_reverseButton.mousePressed(() => (rv_isReverse = !rv_isReverse));

  // waveshaper distortion
  textSize(14);
  text('waveshaper distortion', 210, 305);
  textSize(10);
  wd_amountSlider = createSlider(0, 1, 0.5, 0.01);
  wd_amountSlider.position(210, 335);
  text('distortion amount', 210, 330);
  wd_oversampleSlider = createSlider(0, 2, 0, 1);
  wd_oversampleSlider.position(210, 380);
  text('oversample', 210, 375);
  wd_dryWetSlider = createSlider(0, 1, 0.5, 0.01);
  wd_dryWetSlider.position(210, 425);
  text('dry/wet', 210, 420);
  wd_outputSlider = createSlider(0, 1, 0.5, 0.01);
  wd_outputSlider.position(210, 470);
  text('output level', 210, 465);

  // spectrums
  textSize(14);
  text('spectrum in', 560, 200);
  text('spectrum out', 560, 345);
}
