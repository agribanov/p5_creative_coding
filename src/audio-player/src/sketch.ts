import 'p5/lib/addons/p5.sound';

import P5 from 'p5';
import player from './player';

export class Sketch extends P5 {
    private fft: P5.FFT;
    public soundOut: AudioNode;

    public fftSmoothing = 0.8;
    public fftBins = 256;
    public spectreLength = 0.65;

    public EQType = 'CLASSIC';
    public EQColorScheme = 'INDEX_GRADIENT';

    public fps = 0;

    setup(): void {
        this.createCanvas(this.windowWidth, this.windowHeight);

        this.colorMode(this.HSL);

        const context = <AudioContext>this.getAudioContext();
        const mediaSource = context.createMediaElementSource(player.el);
        mediaSource.connect(this.soundOut);
        // put setup code here
        this.init();
    }

    init(): void {
        this.fft = new P5.FFT(this.fftSmoothing, this.fftBins);
        this.background(0);
    }

    draw(): void {
        // put drawing code here
        this.background(0);
        this.fps = this.frameRate();

        const levels = this.fft.analyze(this.fftBins);
        switch (this.EQType) {
            case 'CLASSIC':
                return this.drawClassicEQ(levels);
            case 'GRADIENT':
                return this.drawGradientEQ(levels);
            case '2LINES':
                return this.draw2LinesEQ(levels);
            case 'SPECTRE_CENTER':
                return this.drawSpectreCenterEQ(levels);
            case 'SPECTRE_BOTTOM':
                return this.drawSpectreBottomEQ(levels);
        }
    }

    drawClassicEQ(levels: number[]) {
        const barsCount = levels.length * this.spectreLength;
        const barWidth = this.width / barsCount;
        this.stroke(0);
        this.strokeWeight(1);
        for (let i = 0; i < barsCount; i++) {
            this.fill(this.map(i, 0, barsCount, 0, 180), 100, 50);
            this.fill(this.getColor(i / barsCount, levels[i] / 255));
            this.rect(
                i * barWidth,
                this.height,
                barWidth + 1,
                -this.map(levels[i], 0, 255, 0, this.height)
            );
        }
    }

    drawGradientEQ(levels: number[]) {
        const barsCount = levels.length * this.spectreLength;
        const barWidth = this.width / barsCount;
        this.noStroke();

        for (let i = 0; i < barsCount; i++) {
            this.fill(this.getColor(i / barsCount, levels[i] / 255));
            this.rect(i * barWidth, this.height, barWidth + 1, -this.height);
        }
    }

    draw2LinesEQ(levels: number[]) {
        const SPECTRE_START_CUTOFF = 0.1;

        const pointsCount =
            levels.length * (this.spectreLength - SPECTRE_START_CUTOFF);
        const segmentLength = this.width / pointsCount;
        this.strokeWeight(3);

        const startIndex = Math.trunc(pointsCount * SPECTRE_START_CUTOFF);
        this.beginShape(this.LINES);
        for (let i = startIndex; i < pointsCount + startIndex; i++) {
            this.stroke(this.getColor(i / pointsCount, levels[i] / 255));
            const x = (i - startIndex) * segmentLength + segmentLength / 2;
            const y = this.map(levels[i], 0, 255, this.height, 0);
            this.vertex(x, y);
            i !== startIndex && this.vertex(x, y);
        }
        this.endShape();

        this.beginShape(this.LINES);
        for (let i = startIndex; i < pointsCount + startIndex; i++) {
            this.stroke(this.getColor(i / pointsCount, levels[i] / 255));
            const x = (i - startIndex) * segmentLength + segmentLength / 2;
            const y = this.map(levels[i], 0, 255, 0, this.height);
            this.vertex(x, y);
            i !== startIndex && this.vertex(x, y);
        }
        this.endShape();
    }

    drawSpectreCenterEQ(levels: number[]) {
        const SPECTRE_START_CUTOFF = 0.1;

        const pointsCount =
            levels.length * (this.spectreLength - SPECTRE_START_CUTOFF);
        const segmentLength = this.width / pointsCount;
        this.strokeWeight(3);

        const startIndex = Math.trunc(pointsCount * SPECTRE_START_CUTOFF);
        this.beginShape(this.LINES);
        const center = this.height / 2;
        for (let i = startIndex; i < pointsCount + startIndex; i++) {
            this.stroke(this.getColor(i / pointsCount, levels[i] / 255));
            const centerOffset = this.map(levels[i], 0, 255, 0, center);
            const x = (i - startIndex) * segmentLength + segmentLength / 2;
            this.vertex(x, center + centerOffset);
            this.vertex(x, center - centerOffset);
        }
        this.endShape();
    }

    drawSpectreBottomEQ(levels: number[]) {
        const SPECTRE_START_CUTOFF = 0.1;

        const pointsCount =
            levels.length * (this.spectreLength - SPECTRE_START_CUTOFF);
        const segmentLength = this.width / pointsCount;
        this.strokeWeight(segmentLength - 2);

        const startIndex = Math.trunc(pointsCount * SPECTRE_START_CUTOFF);
        this.beginShape(this.LINES);
        for (let i = startIndex; i < pointsCount + startIndex; i++) {
            this.stroke(this.getColor(i / pointsCount, levels[i] / 255));

            const lineHeight = this.map(levels[i], 255, 0, 0, this.height);
            const x = (i - startIndex) * segmentLength + segmentLength / 2;
            this.vertex(x, this.height);
            this.vertex(x, lineHeight);
        }
        this.endShape();
    }

    drawFloatingCircleEQ(levels: number[]) {
        const circlesCount = levels.length * this.spectreLength;
    }

    // Colors
    getColor(indexRate: number, valueRate: number): P5.Color {
        switch (this.EQColorScheme) {
            case 'INDEX_GRADIENT':
                return this.indexGradientColor(indexRate, valueRate);
            case 'VALUE_GRADIENT':
                return this.valueGradientColor(indexRate, valueRate);
            case 'AMBIENT':
                return this.ambientColor(indexRate, valueRate);
            default:
                return this.ambientColor(indexRate, valueRate);
        }
    }

    ambientColor(_: number, __: number): P5.Color {
        return this.color(this.frameCount % 360, 100, 50);
    }

    indexGradientColor(indexRate: number, _: number): P5.Color {
        return this.color(this.map(indexRate, 0, 1, 0, 180), 100, 50);
    }

    valueGradientColor(_: number, valueRate: number): P5.Color {
        return this.color(this.map(valueRate, 0, 1, 180, 0), 100, 50);
    }

    windowResized(): void {
        this.resizeCanvas(this.windowWidth, this.windowHeight);
        this.background(0);

        this.textSize(this.width / 5);
    }
}

export default new Sketch(() => {});
