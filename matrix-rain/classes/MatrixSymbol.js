class MatrixSymbol {
    static _initialized = false;

    static COLORS = {
        DARK_GREEN: null,
        GREEN: null,
        LIGHT_GREEN: null,
    };

    static STATE = {
        DYNAMIC: 1,
        STATIC: 2,
        HIDDEN: 3,
    };

    static DELAY_MS = {
        STATIC_SYMBOL_CHANGE_MIN: 2000,
        STATIC_SYMBOL_CHANGE_MAX: 5000,
        DYNAMIC_SYMBOL_CHANGE: 100,
    };

    static init() {
        MatrixSymbol.COLORS = {
            DARK_GREEN: color(0, 59, 0),
            GREEN: color(0, 143, 17),
            LIGHT_GREEN: color(0, 255, 65),
        };
        MatrixSymbol._initialized = true;
    }

    static getRandomSymbol() {
        return String.fromCharCode(0x30a0 + floor(random(0, 97)));
    }

    x = 0;
    y = 0;
    #fadeSpeed = 0;

    state = MatrixSymbol.STATE.DYNAMIC;

    #color = MatrixSymbol.COLORS.LIGHT_GREEN;
    #symbol = null;
    #symbolUpdatedAt = -Infinity;
    #symbolChangeDelay = MatrixSymbol.DELAY_MS.DYNAMIC_SYMBOL_CHANGE;

    #staticUpdatedAt = null;

    constructor(x, y, fadeSpeed) {
        if (!MatrixSymbol._initialized) {
            throw new Error(
                'MatrixSymbol class should be initialized before use. Call MatrixSymbol.init() on setup'
            );
        }

        this.#color =
            random() > 0.7
                ? MatrixSymbol.COLORS.LIGHT_GREEN
                : MatrixSymbol.COLORS.GREEN;

        this.x = x;
        this.y = y;
        this.#fadeSpeed = fadeSpeed;
    }

    render() {
        if (this.state === MatrixSymbol.STATE.HIDDEN) {
            return;
        }

        const time = millis();
        const opacity = this.#getOpacity(time);

        if (this.y > height || opacity < 0) {
            this.setHidden();
            return;
        }

        this.#color.setAlpha(opacity);

        fill(this.#color);
        text(this.#getSymbol(time), this.x, this.y);
    }

    setStatic() {
        this.#symbolChangeDelay = random(
            MatrixSymbol.DELAY_MS.STATIC_SYMBOL_CHANGE_MIN,
            MatrixSymbol.DELAY_MS.STATIC_SYMBOL_CHANGE_MAX
        );
        this.#color = MatrixSymbol.COLORS.GREEN;
        this.state = MatrixSymbol.STATE.STATIC;
        this.#staticUpdatedAt = millis();
    }

    setHidden() {
        this.state = MatrixSymbol.STATE.HIDDEN;
    }

    #getSymbol(time) {
        if (time - this.#symbolUpdatedAt > this.#symbolChangeDelay) {
            this.#symbol = MatrixSymbol.getRandomSymbol();
            this.#symbolUpdatedAt = time;
        }

        return this.#symbol;
    }

    #getOpacity(time) {
        return this.state === MatrixSymbol.STATE.DYNAMIC
            ? 255
            : 255 - this.#fadeSpeed * (time - this.#staticUpdatedAt);
    }
}
