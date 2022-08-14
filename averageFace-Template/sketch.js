var imgs = [];
var avgImg;
var numOfImages = 30;

//////////////////////////////////////////////////////////
function preload() {
  // preload() runs once
  for (var i = 0; i < numOfImages; i++) {
    const img = loadImage(`./assets/${i}.jpg`);
    imgs.push(img);
  }
  avgImg = createGraphics(imgs[0].width, imgs[0].height);
}
//////////////////////////////////////////////////////////
function setup() {
  createCanvas(imgs[0].width * 2, imgs[0].height);
  pixelDensity(1);
}
//////////////////////////////////////////////////////////
function draw() {
  background(125);
  image(imgs[0], 0, 0);

  avgImg.loadPixels();
  imgs.forEach((img) => img.loadPixels());
}
