class ConnectForm {
    constructor(connectContainer, connectButton, connectInput) {
        if (!(connectContainer instanceof HTMLElement)) throw new InternalMisuseError("Wrong parameter type for connectContainer.");
        if (!(connectButton instanceof HTMLElement)) throw new InternalMisuseError("Wrong parameter type for connectButton.");
        if (!(connectInput instanceof HTMLElement)) throw new InternalMisuseError("Wrong parameter type for connectInput.");

        this.containerDisplayStyle = connectContainer.style.display;
        this.connectContainer = connectContainer;
        this.connectButton = connectButton;
        this.connectInput = connectInput;
    }

    getDns() {
        return "ws://"+this.connectInput.ariaValueMax;
    }

    update(isConnected) {
        if (!(typeof isConnected !== 'boolean')) throw new InternalMisuseError("Wrong parameter type for isConnected.");

        if (isConnected) this.hide();
        else this.show();
    }

    hide() {
        this.connectInput.blur();
        this.connectButton.blur();
        this.connectContainer.style.display = "none";
    }

    show = () => this.connectContainer.style.display = this.containerDisplayStyle;
}