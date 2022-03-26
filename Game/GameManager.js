class GameManager {

    constructor(boardManager, canvasManager, gameData, playerManager) {
        if (!(boardManager instanceof BoardManager)) throw new InternalMisuseError("Wrong parameter type for boardManager.");
        if (!(canvasManager instanceof CanvasManager)) throw new InternalMisuseError("Wrong parameter type for canvasManager.");
        if (!(gameData instanceof GameData)) throw new InternalMisuseError("Wrong parameter type for gameData.");
        if (!(playerManager instanceof PlayerManager)) throw new InternalMisuseError("Wrong parameter type for playerManager.");

        this.boardManager = boardManager;
        this.canvasManager = canvasManager;
        this.gameData = gameData;
        this.playerManager = playerManager;
    }

    // path-sensitive function
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