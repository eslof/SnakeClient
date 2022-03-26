class GameManager {

    constructor(boardManager, canvasManager, gameData, playerManager) {
        this.boardManager = boardManager;
        this.canvasManager = canvasManager;
        this.gameData = gameData;
        this.playerManager = playerManager;
    }

    onMessage(e) {
        const gameData = this.gameData;
        const playerManager = this.playerManager;
        gameData.update(e.data);
        if (gameData.players.length > 0) playerManager.update();
        if (gameData.board.length > 0) this.boardManager.draw();
    };

    onResize(e) {
        this.canvasManager.update();
        this.canvasManager.clear();
        this.boardManager.drawFull();
    }
}