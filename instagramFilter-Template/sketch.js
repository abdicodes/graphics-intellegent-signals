// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg
var imgIn;
var matrix = [
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
];
/////////////////////////////////////////////////////////////////
function preload() {
  imgIn = loadImage('assets/husky.jpg');
}
/////////////////////////////////////////////////////////////////
function setup() {
  createCanvas(imgIn.width * 2, imgIn.height);
  pixelDensity(1);
}
/////////////////////////////////////////////////////////////////
function draw() {
  background(125);
  image(imgIn, 0, 0);
  image(earlyBirdFilter(imgIn), imgIn.width, 0);
  noLoop();
}
/////////////////////////////////////////////////////////////////
function mousePressed() {
  loop();
}
/////////////////////////////////////////////////////////////////
function earlyBirdFilter(img) {
  var resultImg = createImage(imgIn.width, imgIn.height);
  resultImg = sepiaFilter(imgIn);
  // resultImg = darkCorners(resultImg);
  // resultImg = radialBlurFilter(resultImg);
  // resultImg = borderFilter(resultImg)
  return resultImg;
}

const sepiaFilter = (img) => {
  const resultImg = createImage(img.width, img.height);
  img.loadPixels();
  resultImg.loadPixels();

  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      let oldRed, oldGreen, oldBlue, newRed, newGreen, newBlue;
      let index = (j * img.width + i) * 4;
      oldRed = img.pixels[index];
      oldGreen = img.pixels[index + 1];
      oldBlue = img.pixels[index + 2];
      newRed = oldRed * 0.393 + oldGreen * 0.769 + oldBlue * 0.189;
      newGreen = oldRed * 0.349 + oldGreen * 0.686 + oldBlue * 0.168;
      newBlue = oldRed * 0.272 + oldGreen * 0.534 + oldBlue * 0.131;
      resultImg.pixels[index] = newRed;
      resultImg.pixels[index + 1] = newGreen;
      resultImg.pixels[index + 2] = newBlue;
      resultImg.pixels[index + 3] = 255;
    }
  }
  resultImg.updatePixels();
  return resultImg;
};
