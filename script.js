
// const cv = require("./libs/opencv340");

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

function showHistogram(canvasName, src){
    
    // let src = image.clone();
    let srcVec = new cv.MatVector();
    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
    srcVec.push_back(src);
    let accumulate = false;
    let channels = [0];
    let histSize = [256];
    let ranges = [0, 255];
    let hist = new cv.Mat();
    let mask = new cv.Mat();
    let color = new cv.Scalar(255, 255, 255);
    let scale = 2;

    // You can try more different parameters
    cv.calcHist(srcVec, channels, mask, hist, histSize, ranges, accumulate);
    let result = cv.minMaxLoc(hist, mask);
    let max = result.maxVal;
    let dst = new cv.Mat.zeros(src.rows, histSize[0] * scale, cv.CV_8UC3);

    // draw histogram
    for (let i = 0; i < histSize[0]; i++) {
        let binVal = hist.data32F[i] * src.rows / max;
        let point1 = new cv.Point(i * scale, src.rows - 1);
        let point2 = new cv.Point((i + 1) * scale - 1, src.rows - binVal);
        cv.rectangle(dst, point1, point2, color, cv.FILLED);
    }
    cv.imshow(canvasName, dst);
    // src.delete(); 
    // imgHist.delete(); srcVec.delete(); mask.delete(); hist.delete();
}


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
    let image = cv.imread(imgElement);
    showHistogram('canvasHist',image);

    let newImage = cv.imread(imgElement);
    showHistogram('canvasHist2',newImage);
    cv.imshow('canvasOutput', newImage);

    image.delete();
    newImage.delete();
});

inputSample1.addEventListener('click', () => {
    imgElement.src = '/images/bright_cat.jpg';
    let image = cv.imread(imgElement);
    showHistogram('canvasHist',image);

    let newImage = cv.imread(imgElement);
    showHistogram('canvasHist2',newImage);
    cv.imshow('canvasOutput', newImage);

    image.delete();
    newImage.delete();
});

inputSample2.addEventListener('click', () => {
    imgElement.src = '/images/butterfly_gray.jpg';
    let image = cv.imread(imgElement);
    showHistogram('canvasHist',image);

    let newImage = cv.imread(imgElement);
    showHistogram('canvasHist2',newImage);
    cv.imshow('canvasOutput', newImage);

    image.delete();
    newImage.delete();
});

inputSample3.addEventListener('click', () => {
    imgElement.src = '/images/head.jpg';
    let image = cv.imread(imgElement);
    showHistogram('canvasHist',image);

    let newImage = cv.imread(imgElement);
    showHistogram('canvasHist2',newImage);
    cv.imshow('canvasOutput', newImage);

    image.delete();
    newImage.delete();
});

inputSample4.addEventListener('click', () => {
    imgElement.src = '/images/lena_color.jpg';
    let image = cv.imread(imgElement);
    showHistogram('canvasHist',image);

    let newImage = cv.imread(imgElement);
    showHistogram('canvasHist2',newImage);
    cv.imshow('canvasOutput', newImage);

    image.delete();
    newImage.delete();
});

inputSample5.addEventListener('click', () => {
    imgElement.src = '/images/retina.jpg';
    let image = cv.imread(imgElement);
    showHistogram('canvasHist',image);

    let newImage = cv.imread(imgElement);
    showHistogram('canvasHist2',newImage);
    cv.imshow('canvasOutput', newImage);

    image.delete();
    newImage.delete();
});

inputSample6.addEventListener('click', () => {
    imgElement.src = '/images/sunflowers.jpg';
    let image = cv.imread(imgElement);
    showHistogram('canvasHist',image);

    let newImage = cv.imread(imgElement);
    showHistogram('canvasHist2',newImage);
    cv.imshow('canvasOutput', newImage);

    image.delete();
    newImage.delete();
});


// imgElement.onload = function () {
//     let mat = cv.imread(imgElement);
//     cv.imshow('canvasOutput', mat);
//     mat.delete();
// };

// inputSample1.onclick = function () {
//     imgElement.src = '/images/bright_cat.jpg';
//     let mat = cv.imread(imgElement);
//     cv.imshow('canvasOutput', mat);
//     showHistogram(mat);
//     mat.delete();
// };

// inputSample2.onclick = function () {
//     let mat = cv.imread(imgElement);
//     cv.imshow('canvasOutput', mat);
//     mat.delete();
// };

// inputSample3.onclick = function () {
//     let mat = cv.imread(imgElement);
//     cv.imshow('canvasOutput', mat);
//     mat.delete();
// };

// inputSample4.onclick = function () {
//     let mat = cv.imread(imgElement);
//     cv.imshow('canvasOutput', mat);
//     mat.delete();
// };

// inputSample5.onclick = function () {
//     let mat = cv.imread(imgElement);
//     cv.imshow('canvasOutput', mat);
//     mat.delete();
// };

// inputSample6.onclick = function () {
//     let mat = cv.imread(imgElement);
//     cv.imshow('canvasOutput', mat);
//     mat.delete();
// };

// var Module = {
//     // https://emscripten.org/docs/api_reference/module.html#Module.onRuntimeInitialized
//     onRuntimeInitialized() {
//         document.getElementById('status').innerHTML = 'OpenCV.js is ready.';
//     }
// };