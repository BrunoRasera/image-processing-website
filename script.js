function showHistogram(canvasName, image) {

    let src = image.clone();
    let srcVec = new cv.MatVector();
    try {
        cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
    } catch (error) {
        console.log(error)
    }

    srcVec.push_back(src);
    let accumulate = false;
    let channels = [0];
    let histSize = [256];
    let ranges = [0, 256];
    let hist = new cv.Mat();
    let mask = new cv.Mat();
    let color = new cv.Scalar(250, 250, 250);
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

    src.delete();
    srcVec.delete(); mask.delete(); hist.delete();
}

function blankHistogramOnSecondCanvas() {
    let dst = new cv.Mat.zeros(20, 20, cv.CV_8UC3);
    cv.imshow('canvasHist2', dst);
    dst.delete();
}


let btnTest = document.getElementById('btn-teste');
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
    imgElement.onload = function () {
        let image = cv.imread(imgElement);
        showHistogram('canvasHist', image);
        image.delete();
    }

});

inputSample1.addEventListener('click', () => {
    imgElement.src = '/images/bright_cat.jpg';
    imgElement.onload = function () {
        let image = cv.imread(imgElement);
        showHistogram('canvasHist', image);

        image.delete();
    }
});

inputSample2.addEventListener('click', () => {
    imgElement.src = '/images/butterfly_gray.jpg';
    imgElement.onload = function () {
        let image = cv.imread(imgElement);
        showHistogram('canvasHist', image);

        image.delete();
    }
});

inputSample3.addEventListener('click', () => {
    imgElement.src = '/images/coin.png';
    imgElement.onload = function () {
        let image = cv.imread(imgElement);
        showHistogram('canvasHist', image);

        image.delete();
    }
});

inputSample4.addEventListener('click', () => {
    imgElement.src = '/images/lena_color.jpg';
    imgElement.onload = function () {
        let image = cv.imread(imgElement);
        showHistogram('canvasHist', image);

        image.delete();
    }
});

inputSample5.addEventListener('click', () => {
    imgElement.src = '/images/retina.jpg';
    imgElement.onload = function () {
        let image = cv.imread(imgElement);
        showHistogram('canvasHist', image);

        image.delete();
    }
});

inputSample6.addEventListener('click', () => {
    imgElement.src = '/images/sunflowers.jpg';
    imgElement.onload = function () {
        let image = cv.imread(imgElement);
        showHistogram('canvasHist', image);

        image.delete();
    }
});


// THRESHOLD

// Binary
let rangeThresold = document.getElementById("thresholdRange");
let rangeValueThresold = document.getElementById("thresholdValue");

rangeThresold.addEventListener("input", function () {
    rangeValueThresold.textContent = this.value;
});

document.getElementById('btn-threshold-binary').addEventListener('click', () => {
    let newImage = cv.imread(imgElement);
    thres = Number(document.getElementById('thresholdRange').value);
    cv.threshold(newImage, newImage, thres, 255, cv.THRESH_BINARY);
    cv.imshow('canvasOutput', newImage);
    showHistogram('canvasHist2', newImage);

    newImage.delete();
});

// Otsu
document.getElementById('btn-threshold-otsu').addEventListener('click', () => {
    let newImage = cv.imread(imgElement);
    thres = 0;
    cv.cvtColor(newImage, newImage, cv.COLOR_RGBA2GRAY, 0);
    cv.threshold(newImage, newImage, thres, 255, cv.THRESH_OTSU);
    cv.imshow('canvasOutput', newImage);
    showHistogram('canvasHist2', newImage);

    newImage.delete();
});

// Adaptive Thresholding 
document.getElementById('btn-threshold-adaptative').addEventListener('click', () => {
    let newImage = cv.imread(imgElement);
    cv.cvtColor(newImage, newImage, cv.COLOR_RGBA2GRAY, 0);
    cv.adaptiveThreshold(newImage, newImage, 200, cv.ADAPTIVE_THRESH_MEAN_C, cv.THRESH_BINARY, 3, 2);
    cv.imshow('canvasOutput', newImage);
    showHistogram('canvasHist2', newImage);

    newImage.delete();
});


// Canny
let rangeCanny1 = document.getElementById("threshold1Range");
let rangeValueCanny1 = document.getElementById("threshold1Value");

rangeCanny1.addEventListener("input", function () {
    rangeValueCanny1.textContent = this.value;
});

let rangeCanny2 = document.getElementById("threshold2Range");
let rangeValueCanny2 = document.getElementById("threshold2Value");

rangeCanny2.addEventListener("input", function () {
    rangeValueCanny2.textContent = this.value;
});

document.getElementById('btn-canny').addEventListener('click', () => {
    let newImage = cv.imread(imgElement);
    thres1 = Number(document.getElementById('threshold1Range').value);
    thres2 = Number(document.getElementById('threshold2Range').value);
    cv.cvtColor(newImage, newImage, cv.COLOR_RGBA2GRAY, 0);
    cv.Canny(newImage, newImage, thres1, thres2, 3, false);
    cv.imshow('canvasOutput', newImage);
    showHistogram('canvasHist2', newImage);

    newImage.delete();
});


// Equalize histogram
document.getElementById('btn-eq-hist').addEventListener('click', () => {
    let newImage = cv.imread(imgElement);
    cv.cvtColor(newImage, newImage, cv.COLOR_RGBA2GRAY, 0);
    cv.equalizeHist(newImage, newImage);
    cv.imshow('canvasOutput', newImage);
    showHistogram('canvasHist2', newImage);

    newImage.delete();
});


// Fourier Transform
document.getElementById('btn-fourier').addEventListener('click', () => {
    let src = cv.imread(imgElement);
    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);

    // get optimal size of DFT
    let optimalRows = cv.getOptimalDFTSize(src.rows);
    let optimalCols = cv.getOptimalDFTSize(src.cols);
    let s0 = cv.Scalar.all(0);
    let padded = new cv.Mat();
    cv.copyMakeBorder(src, padded, 0, optimalRows - src.rows, 0,
        optimalCols - src.cols, cv.BORDER_CONSTANT, s0);

    // use cv.MatVector to distribute space for real part and imaginary part
    let plane0 = new cv.Mat();
    padded.convertTo(plane0, cv.CV_32F);
    let planes = new cv.MatVector();
    let complexI = new cv.Mat();
    let plane1 = new cv.Mat.zeros(padded.rows, padded.cols, cv.CV_32F);
    planes.push_back(plane0);
    planes.push_back(plane1);
    cv.merge(planes, complexI);

    // in-place dft transform
    cv.dft(complexI, complexI);

    // compute log(2 + sqrt(Re(DFT(img))**2 + Im(DFT(img))**2))
    cv.split(complexI, planes);
    cv.magnitude(planes.get(0), planes.get(1), planes.get(0));
    let mag = planes.get(0);
    let m1 = new cv.Mat.ones(mag.rows, mag.cols, mag.type());
    cv.add(mag, m1, mag);
    cv.log(mag, mag);

    // crop the spectrum, if it has an odd number of rows or columns
    let rect = new cv.Rect(0, 0, mag.cols & -2, mag.rows & -2);
    mag = mag.roi(rect);

    // rearrange the quadrants of Fourier image
    // so that the origin is at the image center
    let cx = mag.cols / 2;
    let cy = mag.rows / 2;
    let tmp = new cv.Mat();

    let rect0 = new cv.Rect(0, 0, cx, cy);
    let rect1 = new cv.Rect(cx, 0, cx, cy);
    let rect2 = new cv.Rect(0, cy, cx, cy);
    let rect3 = new cv.Rect(cx, cy, cx, cy);

    let q0 = mag.roi(rect0);
    let q1 = mag.roi(rect1);
    let q2 = mag.roi(rect2);
    let q3 = mag.roi(rect3);

    // exchange 1 and 4 quadrants
    q0.copyTo(tmp);
    q3.copyTo(q0);
    tmp.copyTo(q3);

    // exchange 2 and 3 quadrants
    q1.copyTo(tmp);
    q2.copyTo(q1);
    tmp.copyTo(q2);

    // The pixel value of cv.CV_32S type image ranges from 0 to 1.
    cv.normalize(mag, mag, 0, 1, cv.NORM_MINMAX);
    cv.imshow('canvasOutput', mag)
    blankHistogramOnSecondCanvas();

    src.delete(); padded.delete(); planes.delete(); complexI.delete(); m1.delete(); tmp.delete();
});

// Segmentation
document.getElementById('btn-segmentation').addEventListener('click', () => {
    let src = cv.imread(imgElement);
    let dst = new cv.Mat();
    let gray = new cv.Mat();
    let opening = new cv.Mat();
    let coinsBg = new cv.Mat();
    let coinsFg = new cv.Mat();
    let distTrans = new cv.Mat();
    let unknown = new cv.Mat();
    let markers = new cv.Mat();
    // gray and threshold image
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
    cv.threshold(gray, gray, 0, 255, cv.THRESH_BINARY_INV + cv.THRESH_OTSU);
    // get background
    let M = cv.Mat.ones(3, 3, cv.CV_8U);
    cv.erode(gray, gray, M);
    cv.dilate(gray, opening, M);
    cv.dilate(opening, coinsBg, M, new cv.Point(-1, -1), 3);
    // distance transform
    cv.distanceTransform(opening, distTrans, cv.DIST_L2, 5);
    cv.normalize(distTrans, distTrans, 1, 0, cv.NORM_INF);
    // get foreground
    cv.threshold(distTrans, coinsFg, 0.7 * 1, 255, cv.THRESH_BINARY);
    coinsFg.convertTo(coinsFg, cv.CV_8U, 1, 0);
    cv.subtract(coinsBg, coinsFg, unknown);
    // get connected components markers
    cv.connectedComponents(coinsFg, markers);
    for (let i = 0; i < markers.rows; i++) {
        for (let j = 0; j < markers.cols; j++) {
            markers.intPtr(i, j)[0] = markers.ucharPtr(i, j)[0] + 1;
            if (unknown.ucharPtr(i, j)[0] == 255) {
                markers.intPtr(i, j)[0] = 0;
            }
        }
    }
    cv.cvtColor(src, src, cv.COLOR_RGBA2RGB, 0);
    cv.watershed(src, markers);
    // draw barriers
    for (let i = 0; i < markers.rows; i++) {
        for (let j = 0; j < markers.cols; j++) {
            if (markers.intPtr(i, j)[0] == -1) {
                src.ucharPtr(i, j)[0] = 255; // R
                src.ucharPtr(i, j)[1] = 0; // G
                src.ucharPtr(i, j)[2] = 0; // B
            }
        }
    }
    cv.imshow('canvasOutput', src);
    blankHistogramOnSecondCanvas();

    src.delete(); dst.delete(); gray.delete(); opening.delete(); coinsBg.delete();
    coinsFg.delete(); distTrans.delete(); unknown.delete(); markers.delete(); M.delete();
});


// NOISE

// Salt and pepper
let rangeInputSaltPepper = document.getElementById("saltPepperRange");
let rangeValueSaltPepper = document.getElementById("saltPepperRangeValue");

rangeInputSaltPepper.addEventListener("input", function () {
    rangeValueSaltPepper.textContent = this.value;
});

document.getElementById('btn-ruido-saltpepper').addEventListener('click', () => {
    let image = cv.imread(imgElement);
    cv.cvtColor(image, image, cv.COLOR_RGBA2GRAY, 0);

    let prob = Number(document.getElementById('saltPepperRange').value);

    let salt = 1 - prob
    let pepper = prob

    let newImage = new cv.Mat(image.rows, image.cols, cv.CV_8UC1);
    for (let x = 0; x < image.rows; x++) {
        for (let y = 0; y < image.cols; y++) {
            let rand = Math.random();
            if (rand > salt) {
                newImage.ucharPtr(x, y)[0] = 255;
            } else if (rand < pepper) {
                newImage.ucharPtr(x, y)[0] = 0;
            } else {
                newImage.ucharPtr(x, y)[0] = image.ucharPtr(x, y)[0];
            }
        }
    }

    cv.imshow("canvasOutput", newImage);
    showHistogram('canvasHist2', newImage);
    image.delete();
    newImage.delete();
});

// Poisson
let rangeInputPoisson = document.getElementById("poissonRange");
let rangeValuePoisson = document.getElementById("poissonRangeValue");

rangeInputPoisson.addEventListener("input", function () {
    rangeValuePoisson.textContent = this.value;
});

document.getElementById('btn-ruido-poisson').addEventListener('click', () => {
    let image = cv.imread(imgElement);
    cv.cvtColor(image, image, cv.COLOR_RGBA2GRAY, 0);

    let lambda = Number(document.getElementById('poissonRange').value);

    let height = image.rows;
    let width = image.cols;

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            let pixelValue = image.data[row * width + col];
            let noise = Math.floor(-Math.log(1 - Math.random()) * lambda);
            image.data[row * width + col] = Math.max(0, Math.min(255, pixelValue + noise));
        }
    }


    cv.imshow("canvasOutput", image);
    showHistogram('canvasHist2', image);
    image.delete();
});


// MASKS

// Mask
document.getElementById('btn-mask').addEventListener('click', () => {
    let image = cv.imread(imgElement);
    cv.cvtColor(image, image, cv.COLOR_RGBA2GRAY, 0);

    let kernel = new cv.Mat(3, 3, cv.CV_32F);

    kernel.data32F[0] = Number(document.getElementById('input00').value);
    kernel.data32F[1] = Number(document.getElementById('input01').value);
    kernel.data32F[2] = Number(document.getElementById('input02').value);

    kernel.data32F[3] = Number(document.getElementById('input10').value);
    kernel.data32F[4] = Number(document.getElementById('input11').value);
    kernel.data32F[5] = Number(document.getElementById('input12').value);

    kernel.data32F[6] = Number(document.getElementById('input20').value);
    kernel.data32F[7] = Number(document.getElementById('input21').value);
    kernel.data32F[8] = Number(document.getElementById('input22').value);

    let result = new cv.Mat();
    cv.filter2D(image, result, -1, kernel);

    cv.imshow("canvasOutput", result);
    showHistogram('canvasHist2', result);
    image.delete();
    result.delete();
});

// Media
document.getElementById("btn-media").addEventListener("click", function() {
    let matrix = [
        [0.111, 0.111, 0.111],
        [0.111, 0.111, 0.111],
        [0.111, 0.111, 0.111]];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById(`input${i}${j}`).value = matrix[i][j];
        }
    }
});

// Desfocar
document.getElementById("btn-desfocar").addEventListener("click", function() {
    let matrix = [
        [0.25, 0.25, 0.25],
        [0.25, 0.25, 0.25],
        [0.25, 0.25, 0.25]];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById(`input${i}${j}`).value = matrix[i][j];
        }
    }
});

// Agucar
document.getElementById("btn-agucar").addEventListener("click", function() {
    let matrix = [
        [-1, -1, -1],
        [-1, 9, -1],
        [-1, -1, -1]];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById(`input${i}${j}`).value = matrix[i][j];
        }
    }
});

// HiBoost
document.getElementById("btn-hiboost").addEventListener("click", function() {
    let matrix = [
        [0, -1, 0],
        [-1, 5.2, -1],
        [0, -1, 0]];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById(`input${i}${j}`).value = matrix[i][j];
        }
    }
});

// Relevo
document.getElementById("btn-relevo").addEventListener("click", function() {
    let matrix = [
        [-2, -1, 0],
        [-1, 1, 1],
        [0, 1, 2]];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById(`input${i}${j}`).value = matrix[i][j];
        }
    }
});

// Horizontal
document.getElementById("btn-horizontal").addEventListener("click", function() {
    let matrix = [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1]];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById(`input${i}${j}`).value = matrix[i][j];
        }
    }
});

// Vertical
document.getElementById("btn-vertical").addEventListener("click", function() {
    let matrix = [
        [-1, -2, -1],
        [0, 0, 0],
        [1, 2, 1]];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById(`input${i}${j}`).value = matrix[i][j];
        }
    }
});

// Laplaciana
document.getElementById("btn-laplaciana").addEventListener("click", function() {
    let matrix = [
        [0, -1, 0],
        [-1, 4, -1],
        [0, -1, 0]];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById(`input${i}${j}`).value = matrix[i][j];
        }
    }
});

// Gaussiana
document.getElementById("btn-gaussiana").addEventListener("click", function() {
    let matrix = [
        [0.0625, 0.125, 0.0625],
        [0.125, 0.25, 0.125],
        [0.0625, 0.125, 0.0625]];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById(`input${i}${j}`).value = matrix[i][j];
        }
    }
});

// Detector de bordas
document.getElementById("btn-bordas").addEventListener("click", function() {
    let matrix = [
        [-1, -1, -1],
        [-1, 8  , -1],
        [-1, -1, -1]];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById(`input${i}${j}`).value = matrix[i][j];
        }
    }
});