class Input {
    static None = 1;
    static Left = 2;
    static Right = 3;
}

class InputManager {
    keyMap = {
        37: Input.Left, //left arrow
        39: Input.Right, //right arrow
        65: Input.Left, //key A
        68: Input.Right //key D
    };
    pressed = {};
    currentInput = Input.None;

    constructor(websocket) {
        this.websocket = websocket;
        this.pressed[Input.Left] = null;
        this.pressed[Input.Right] = null;
    }

    getInput() {
        let isLeft = this.pressed[Input.Left];
        let isRight = this.pressed[Input.Right];
        return isLeft && isRight ? Input.None : isLeft ?? isRight ?? Input.None;
    }

    onKeyDown(e) {
        const keyCode = e.keyCode || e.which;
        this.pressed[this.keyMap[keyCode]] = this.keyMap[keyCode];
        this.websocket.send(Request.getInputRequest(this.getInput()));
    }

    onKeyUp(e) {
        const keyCode = e.keyCode || e.which;
        this.pressed[this.keyMap[keyCode]] = null;
        this.websocket.send(Request.getInputRequest(this.getInput()));
    }
}