function setup() {
    createCanvas(windowWidth, windowHeight);
    // put setup code here
    textSize(width / 5);
    textAlign(CENTER, CENTER);
    colorMode(HSL);
    background(0);
}

function draw() {
    // put drawing code here
    background(0, 0.1);

    let time = millis();
    translate(width / 2, height / 2);
    rotate(time / 2000);

    fill(frameCount % 360, 100, 50);
    text('hello world', 0, 0);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    textSize(width / 5);
}

function mouseClicked() {
    saveCanvas('helloWorldPreview', 'png');
}
