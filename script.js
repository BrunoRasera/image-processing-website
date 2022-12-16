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
let inputSample1 = document.getElementById('sample-image1');
let inputSample2 = document.getElementById('sample-image2');
let inputSample3 = document.getElementById('sample-image3');
let inputSample4 = document.getElementById('sample-image4');
let inputSample5 = document.getElementById('sample-image5');
let inputSample6 = document.getElementById('sample-image6');

inputElement.addEventListener('change', (e) => {
    imgElement.src = URL.createObjectURL(e.target.files[0]);
}, false);

inputSample1.addEventListener('click', () => {
    imgElement.src = '/images/bright_cat.jpg';
}, false);

inputSample2.addEventListener('click', () => {
    imgElement.src = '/images/butterfly_gray.jpg';
}, false);

inputSample3.addEventListener('click', () => {
    imgElement.src = '/images/head.jpg';
}, false);

inputSample4.addEventListener('click', () => {
    imgElement.src = '/images/lena_color.jpg';
}, false);

inputSample5.addEventListener('click', () => {
    imgElement.src = '/images/retina.jpg'
}, false);

inputSample6.addEventListener('click', () => {
    imgElement.src = '/images/sunflowers.jpg';
}, false);


imgElement.onload = function () {
    let mat = cv.imread(imgElement);
    cv.imshow('canvasOutput', mat);
    mat.delete();
};

inputSample1.onload = function () {
    let mat = cv.imread(imgElement);
    cv.imshow('canvasOutput', mat);
    mat.delete();
};

inputSample2.onload = function () {
    let mat = cv.imread(imgElement);
    cv.imshow('canvasOutput', mat);
    mat.delete();
};

inputSample3.onload = function () {
    let mat = cv.imread(imgElement);
    cv.imshow('canvasOutput', mat);
    mat.delete();
};

inputSample4.onload = function () {
    let mat = cv.imread(imgElement);
    cv.imshow('canvasOutput', mat);
    mat.delete();
};

inputSample5.onload = function () {
    let mat = cv.imread(imgElement);
    cv.imshow('canvasOutput', mat);
    mat.delete();
};

inputSample6.onload = function () {
    let mat = cv.imread(imgElement);
    cv.imshow('canvasOutput', mat);
    mat.delete();
};

// var Module = {
//     // https://emscripten.org/docs/api_reference/module.html#Module.onRuntimeInitialized
//     onRuntimeInitialized() {
//         document.getElementById('status').innerHTML = 'OpenCV.js is ready.';
//     }
// };