'use strict';
let lines = [];

let PARAMS = { TEXT_SIZE: 16 };

function setup() {
    createCanvas(windowWidth, windowHeight);

    MatrixSymbol.init();

    init();
}

function init() {
    textSize(PARAMS.TEXT_SIZE);
    textStyle(BOLD);
    background(0);

    lines = new Array(Math.floor(width / PARAMS.TEXT_SIZE))
        .fill(null)
        .map((_, i) => new MatrixLine(i * PARAMS.TEXT_SIZE));
}

function draw() {
    background(0);
    // put drawing code here
    lines.forEach((l) => l.render());
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    init();
}
