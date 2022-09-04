class MatrixLine {
    static DELAY = {
        NEW_SYMBOL_DELAY_MAX: 50,
        NEW_SYMBOL_DELAY_MIN: 10,
        RESTART: 500,
    };

    static FADEOUT_SPEED = {
        MIN: 0.1,
        MAX: 1,
    };

    static MAX_OFFSCREEN_SYMBOLS_COUNT = 70;

    static STATE = {
        ACTIVE: 1,
        STOPPED: 2,
    };

    #x = 0;
    #symbols = [];
    #stoppedSymbols = [];
    #newSymbolDelay = 1000;
    #newSymbolAddedAt = 0;
    #fadeoutSpeed = 0;
    #state = null;
    #stoppedAt = 0;

    constructor(x) {
        this.#x = x;

        this.#reset();

        this.#addSymbol(
            random(-MatrixLine.MAX_OFFSCREEN_SYMBOLS_COUNT * TEXT_SIZE, 0),
            millis()
        );
    }

    render() {
        this.#restartStopped();
        this.#updateSymbols();
        this.#randomStop();

        this.#symbols.forEach((s) => s.render());
        this.#stoppedSymbols.forEach((s) => s.render());
    }

    #restartStopped() {
        if (this.#state === MatrixLine.STATE.ACTIVE) {
            return;
        }

        const time = millis();
        if (time - this.#stoppedAt > MatrixLine.DELAY.RESTART) {
            this.#reset();
        }
    }

    #updateSymbols() {
        if (this.#state === MatrixLine.STATE.STOPPED) {
            return;
        }
        const time = millis();

        if (time - this.#newSymbolAddedAt > this.#newSymbolDelay) {
            const lastSymbol = this.#symbols[this.#symbols.length - 1];
            const y = lastSymbol ? lastSymbol.y + TEXT_SIZE : 0;
            if (y > height) {
                this.#stop();
            } else {
                lastSymbol?.setStatic();
                this.#addSymbol(y, time);
            }
        }
    }

    #addSymbol(y, time) {
        this.#symbols.push(new MatrixSymbol(this.#x, y, this.#fadeoutSpeed));

        this.#newSymbolAddedAt = time;
    }

    #reset() {
        this.#symbols = [];
        this.#newSymbolDelay = random(
            MatrixLine.DELAY.NEW_SYMBOL_DELAY_MIN,
            MatrixLine.DELAY.NEW_SYMBOL_DELAY_MAX
        );
        this.#fadeoutSpeed = 255 / (this.#newSymbolDelay * 150);
        this.#newSymbolAddedAt = 0;
        this.#state = MatrixLine.STATE.ACTIVE;
    }
    #randomStop() {
        if (this.#state === MatrixLine.STATE.STOPPED) {
            return;
        }

        const chance = random();
        if (chance > 0.995) {
            this.#stop();
        }
    }

    #stop() {
        this.#state = MatrixLine.STATE.STOPPED;
        this.#symbols[this.#symbols.length - 1]?.setStatic();
        this.#stoppedSymbols.push(...this.#symbols);
        setTimeout(() => {
            this.#stoppedSymbols = this.#stoppedSymbols.filter(
                (s) => s.state !== MatrixSymbol.STATE.HIDDEN
            );
        });
        this.#symbols = [];
        this.#stoppedAt = millis();
    }
}
