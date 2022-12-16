// const cv = require("./libs/opencv460");

// const canvas = document.getElementById("canvas-output");

// const imageWidth = 480;
// const imageHeight = 320;

// canvas.onload = function() {

//     let frame = new cv.Mat();
//     let frameFiltered = new cv.Mat();

//     frame = cv.imread("images/lena_color.jpg");

//     cv.cvtColor(frame, frameFiltered, cv.COLOR_RGBA2GRAY, 0);

//     cv.imshow(canvas, frameFiltered);

//     frameFiltered.delete();
// }

let imgElement = document.getElementById('imageSrc');
let inputElement = document.getElementById('fileInput');

inputElement.addEventListener('change', (e) => {
  imgElement.src = URL.createObjectURL(e.target.files[0]);
}, false);

imgElement.onload = function() {
  let mat = cv.imread(imgElement);
  cv.imshow('canvasOutput', mat);
  mat.delete();
};

var Module = {
  // https://emscripten.org/docs/api_reference/module.html#Module.onRuntimeInitialized
  onRuntimeInitialized() {
    document.getElementById('status').innerHTML = 'OpenCV.js is ready.';
  }
};