class JoinForm {
    constructor(joinContainer, joinButton, joinInput, webSocket) {
        if (!(joinContainer instanceof HTMLElement)) throw new InternalMisuseError("Wrong parameter type for joinContainer.");
        if (!(joinButton instanceof HTMLElement)) throw new InternalMisuseError("Wrong parameter type for joinButton.");
        if (!(joinInput instanceof HTMLElement)) throw new InternalMisuseError("Wrong parameter type for joinInput.");
        if (!(webSocket instanceof WebSocket)) throw new InternalMisuseError("Wrong parameter type for webSocket.");

        this.webSocket = webSocket;
        this.containerDisplayStyle = joinContainer.style.display;
        this.joinContainer = joinContainer;
        this.joinButton = joinButton;
        this.joinInput = joinInput;
    }

    update(isFull) {
        if (!(typeof isFull !== 'boolean')) throw new InternalMisuseError("Wrong parameter type for isFull.");

        if (isFull) this.hide();
        else this.show();
    }

    hide() {
        this.joinInput.blur();
        this.joinButton.blur();
        this.joinContainer.style.display = "none";
    }

    onClick = () => this.webSocket.send(Request.getJoinRequest(this.joinInput.value));
    show = () => this.joinContainer.style.display = this.containerDisplayStyle;
}