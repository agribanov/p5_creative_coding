import P5 from 'p5';

export class Sketch extends P5 {
    public maxLevelsCount = 10;
    public childBranchesAngle = 15;
    public growingSpeed = 500; // %/s

    private branchLength = 0;
    private growStartMS = 0;
    private currentLevel = 1;
    private lastBranchLength = 0;

    public branchColor = '#4E3524';
    public leafColor = '#00ff00';

    setup(): void {
        this.createCanvas(this.windowWidth / 2, this.windowHeight / 2);
        this.angleMode(this.DEGREES);
        // put setup code here
        this.init();
    }

    init(): void {
        this.currentLevel = 0;
        this.growStartMS = this.millis();
        this.strokeWeight(2);
        this.background(0);
    }

    draw(): void {
        // put drawing code here
        const lifetime = this.millis() - this.growStartMS;
        const treeLength =
            ((lifetime * (this.growingSpeed / 100)) / 1000) * this.branchLength;
        //
        this.branchLength = this.height / this.maxLevelsCount;
        this.currentLevel = Math.trunc(treeLength / this.branchLength);
        this.lastBranchLength =
            treeLength - this.currentLevel * this.branchLength;

        if (this.currentLevel >= this.maxLevelsCount) {
            this.currentLevel = this.maxLevelsCount - 1;
            this.lastBranchLength = this.branchLength;
        }

        this.background(0);
        this.drawChild(0, this.width / 2, this.height, 0);
    }

    drawChild(
        levelIndex: number,
        rootX: number,
        rootY: number,
        angle: number
    ): void {
        if (levelIndex > this.currentLevel) return;

        const endX = 0;
        const endY =
            levelIndex !== this.currentLevel
                ? -this.branchLength
                : -this.lastBranchLength;

        // console.log('drawing level', endY);
        this.push();
        this.translate(rootX, rootY);
        this.rotate(angle);

        let color = this.color(this.branchColor);
        if (levelIndex === this.currentLevel - 1) {
            color = this.lerpColor(
                this.color(this.leafColor),
                this.color(this.branchColor),
                this.lastBranchLength / this.branchLength
            );
        } else if (levelIndex === this.currentLevel) {
            color = this.color(this.leafColor);
        }

        this.stroke(color);
        this.line(0, 0, endX, endY);
        this.drawChild(levelIndex + 1, endX, endY, this.childBranchesAngle);
        this.drawChild(levelIndex + 1, endX, endY, -this.childBranchesAngle);
        this.pop();

        // const endX = rootX;
        // const endY = rootY - this.branchLength;

        // this.stroke(this.branchColor);
        // this.line(rootX, rootY, endX, endY);

        // this.push();
        // this.translate(endX, endY);
        // this.rotate(this.childBranchesAngle);
        // this.drawChild(levelIndex + 1, endX, endY);
        // this.pop();

        // this.push();
        // this.translate(endX, endY);
        // this.rotate(-this.childBranchesAngle);
        // this.drawChild(levelIndex + 1, endX, endY);
        // this.pop();
    }

    windowResized(): void {
        if (this.fullscreen()) {
            this.resizeCanvas(this.windowWidth, this.windowHeight);
        } else {
            this.resizeCanvas(this.windowWidth / 2, this.windowHeight / 2);
        }

        this.background(0);
    }
}

export default new Sketch(() => {});
