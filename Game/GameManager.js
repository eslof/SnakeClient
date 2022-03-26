class GameManager {

    constructor(boardManager, canvasManager, gameData, playerManager, joinButton, joinInput, websocket) {
        this.boardManager = boardManager;
        this.canvasManager = canvasManager;
        this.gameData = gameData;
        this.playerManager = playerManager;
        this.joinButton = joinButton;
        this.joinInput = joinInput;
        this.websocket = websocket;
        // todo: join stuff shouldnt be here probably
        joinButton.onclick = () => this.requestJoin();
        playerManager.onPlayerJoin = () => this.updateJoinUI();
        playerManager.onPlayerLeave = () => this.updateJoinUI();
    }

    requestJoin() {
        this.websocket.send(Request.getJoinRequest(this.joinInput.value));
        // TODO: handle on join success/fail
    }

    updateJoinUI() {
        const playerManager = this.playerManager;
        const joinButton = this.joinButton;
        const joinInput = this.joinInput;
        if (playerManager.players.length >= playerManager.maxPlayers) {
            joinButton.style.display = joinInput.style.display = "none";
        } else {
            joinButton.style.display = joinInput.style.display = "inline-block";
        }
    }

    onMessage(e) {
        const gameData = this.gameData;
        const playerManager = this.playerManager;
        gameData.update(e.data);
        if (gameData.players.length > 0) playerManager.update(gameData.players);
        if (gameData.board.length > 0) this.boardManager.update(gameData.board);
    };

    onResize(e) {
        console.log("hell?");
        this.canvasManager.update();
        this.canvasManager.clear();
        this.boardManager.drawFull();
    }
}