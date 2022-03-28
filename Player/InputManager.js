class Input {
    static NONE = 1;
    static LEFT = 3; // up down reversed in canvas y+ is down
    static RIGHT = 2; //so these two are reversed
}

class InputManager {
    keyMap = {
        38: Input.NONE, //forward arrow
        37: Input.LEFT, //left arrow
        39: Input.RIGHT, //right arrow
        87: Input.NONE, //key W
        65: Input.LEFT, //key A
        68: Input.RIGHT //key D
    };

    constructor(webSocket, window) {
        if (!(webSocket instanceof WebSocket)) throw new InternalMisuseError("Wrong parameter type for webSocket.");
        if (!(window instanceof Window)) throw new InternalMisuseError("Wrong parameter type for window.");
        this.webSocket = webSocket;
    }

    startListen() {
        window.onkeydown = (e) => this.onKeyDown(e);
        window.onkeyup = (e) => this.onKeyUp(e);
    }

    stopListen() {
        window.onkeydown = null;
        window.onkeyup = null;
    }

    onKeyDown(e) {
        const keyCode = e.keyCode || e.which; // TODO: deprecated use > e.code "ArrowLeft" et.c.
        if (!(keyCode in this.keyMap)) return;
        this.webSocket.send(Request.getInputRequest(this.keyMap[keyCode]));
    }

    onKeyUp(e) { }
}
