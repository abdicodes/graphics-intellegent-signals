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
  resultImg = darkCorners(resultImg);
  resultImg = radialBlurFilter(resultImg);
  // resultImg = borderFilter(resultImg)
  return resultImg;
}

const radialBlurFilter = (img) => {
  const resultImg = createImage(img.width, img.height);
  img.loadPixels();
  resultImg.loadPixels();

  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      let index = (j * img.width + i) * 4;
      let c = convolution(i, j, matrix, img);

      resultImg.pixels[index] = c[0];
      resultImg.pixels[index + 1] = c[1];
      resultImg.pixels[index + 2] = c[2];
      resultImg.pixels[index + 3] = 255;
    }
  }

  resultImg.updatePixels();
  return resultImg;
};

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

const darkCorners = (img) => {
  const maxDist = dist(0, 0, img.width / 2, img.height / 2);
  const resultImg = createImage(img.width, img.height);
  img.loadPixels();

  resultImg.loadPixels();
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      let index = (j * img.width + i) * 4;
      let pixelDist, dynLum;

      pixelDist = dist(img.width / 2, img.height / 2, i, j);

      if (pixelDist >= 450) {
        dynLum = map(pixelDist, maxDist, 450, 0, 0.4);
        dynLum = constrain(dynLum, 0, 0.4);
      } else if (pixelDist < 450 && pixelDist > 300) {
        dynLum = map(pixelDist, 450, 300, 0.4, 1);
        dynLum = constrain(dynLum, 0.4, 1);
      } else {
        dynLum = 1;
      }
      resultImg.pixels[index] = img.pixels[index] * dynLum;
      resultImg.pixels[index + 1] = img.pixels[index + 1] * dynLum;
      resultImg.pixels[index + 2] = img.pixels[index + 2] * dynLum;
      resultImg.pixels[index + 3] = 255;
    }
  }
  resultImg.updatePixels();
  return resultImg;
};

const convolution = (x, y, matrix, img) => {
  let totalRed = 0;
  let totalGreen = 0;
  let totalBlue = 0;
  const offset = floor(matrix.length / 2);

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      let xLoc = x + i - offset;
      let yLoc = y + j - offset;
      let index = (img.width * yLoc + xLoc) * 4;
      index = constrain(index, 0, img.pixels.length - 1);

      totalRed += img.pixels[index] * matrix[i][j];
      totalGreen += img.pixels[index + 1] * matrix[i][j];
      totalBlue += img.pixels[index + 2] * matrix[i][j];
    }
  }
  // console.log(totalRed, totalBlue, totalGreen);
  return [totalRed, totalGreen, totalBlue];
};
