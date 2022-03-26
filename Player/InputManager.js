class Input {
    static NONE = 1;
    static LEFT = 2;
    static RIGHT = 3;
}

class InputManager {
    keyMap = {
        37: Input.LEFT, //left arrow
        39: Input.RIGHT, //right arrow
        65: Input.LEFT, //key A
        68: Input.RIGHT //key D
    };
    pressed = {};

    constructor(webSocket) {
        if (!(webSocket instanceof WebSocket)) throw new InternalMisuseError("Wrong parameter type for webSocket.");

        this.webSocket = webSocket;
        this.pressed[Input.LEFT] = null;
        this.pressed[Input.RIGHT] = null;
    }

    getInput() {
        let isLeft = this.pressed[Input.LEFT];
        let isRight = this.pressed[Input.RIGHT];
        return isLeft && isRight ? Input.NONE : isLeft ?? isRight ?? Input.NONE;
    }

    onKeyDown(e) {
        const keyCode = e.keyCode || e.which; // TODO: deprecated use > e.code "ArrowLeft" et.c.
        if (!(keyCode in this.keyMap)) return;
        this.pressed[this.keyMap[keyCode]] = this.keyMap[keyCode];
        this.webSocket.send(Request.getInputRequest(this.getInput()));
    }

    onKeyUp(e) {
        const keyCode = e.keyCode || e.which;
        if (!(keyCode in this.keyMap)) return;
        this.pressed[this.keyMap[keyCode]] = null;
        this.webSocket.send(Request.getInputRequest(this.getInput()));
    }
}