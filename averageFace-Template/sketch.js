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
}
//////////////////////////////////////////////////////////
function setup() {
  pixelDensity(1);
  createCanvas(imgs[0].width * 2, imgs[0].height);
  avgImg = createGraphics(imgs[0].width, imgs[0].height);
}
//////////////////////////////////////////////////////////
function draw() {
  background(125);

  image(imgs[0], 0, 0);

  avgImg.loadPixels();
  imgs.forEach((img) => img.loadPixels());

  for (let i = 0; i < avgImg.height; i++) {
    for (let j = 0; j < imgs[0].width; j++) {
      let sumR = (sumG = sumB = 0);
      for (let k = 0; k < imgs.length; k++) {
        sumR += imgs[k].pixels[(imgs[k].width * i + j) * 4];
        sumG += imgs[k].pixels[(imgs[k].width * i + j) * 4 + 1];
        sumB += imgs[k].pixels[(imgs[k].width * i + j) * 4 + 2];
      }
      avgImg.pixels[(avgImg.width * i + j) * 4] = sumR / imgs.length;
      avgImg.pixels[(avgImg.width * i + j) * 4 + 1] = sumG / imgs.length;
      avgImg.pixels[(avgImg.width * i + j) * 4 + 2] = sumB / imgs.length;
      avgImg.pixels[(avgImg.width * i + j) * 4 + 3] = 255;
    }
  }
  avgImg.updatePixels();
  console.log(avgImg.pixels);
  image(avgImg, imgs[0].width, 0);
  noLoop();
}
