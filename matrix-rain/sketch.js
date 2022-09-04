'use strict';
let lines = [];

const TEXT_SIZE = 16;

function setup() {
    createCanvas(windowWidth, windowHeight);

    MatrixSymbol.init();
    textSize(TEXT_SIZE);
    textStyle(BOLD);

    init();
}

function init() {
    background(0);

    lines = new Array(Math.floor(width / TEXT_SIZE))
        .fill(null)
        .map((_, i) => new MatrixLine(i * TEXT_SIZE));
}

function draw() {
    background(0);
    // put drawing code here
    lines.forEach((l) => l.render());
    console.log(frameRate());
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    init();
}

function mouseClicked() {
    saveCanvas('MatrixPreview', 'png');
}
