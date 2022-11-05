import P5 from 'p5';

export class Sketch extends P5 {
    setup(): void {
        this.createCanvas(this.windowWidth, this.windowHeight);
        // put setup code here
        this.init();
    }

    init(): void {
        this.textSize(this.width / 5);
        this.textAlign(this.CENTER, this.CENTER);
        this.colorMode(this.HSL);
        this.background(0);
    }

    draw(): void {
        // put drawing code here
        this.background(0, 0.1);

        let time = this.millis();
        this.translate(this.width / 2, this.height / 2);
        this.rotate(time / 1000);

        this.fill(this.frameCount % 360, 100, 50);
        this.text('hello world', 0, 0);
    }

    windowResized(): void {
        this.resizeCanvas(this.windowWidth, this.windowHeight);
        this.background(0);

        this.textSize(this.width / 5);
    }
}

export default null; //new Sketch(() => {});
