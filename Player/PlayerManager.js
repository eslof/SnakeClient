class PlayerManager {
    players = [];
    gameData;
    inputManager;
    maxPlayers;
    playerTable;
    joinForm;

    constructor(gameData, inputManager, joinForm, maxPlayers, playerTable) {
        if (!(gameData instanceof GameData)) throw new InternalMisuseError("Wrong parameter type for gameData.");
        if (!(inputManager instanceof InputManager)) throw new InternalMisuseError("Wrong parameter type for gameData.");
        if (!(playerTable instanceof PlayerTable)) throw new InternalMisuseError("Wrong parameter type for playerTable.");
        if (!(joinForm instanceof JoinForm)) throw new InternalMisuseError("Wrong parameter type for joinForm.");
        if (!Number.isInteger(maxPlayers)) throw new InternalMisuseError("Wrong parameter type for maxPlayers.");

        this.gameData = gameData;
        this.inputManager = inputManager;
        this.maxPlayers = maxPlayers;
        this.playerTable = playerTable;
        this.joinForm = joinForm;
    }

    // semi path-sensitive function (depending on how often the game mode updates health/score)
    update() {
        const playerData = this.gameData.players;
        this._updatePlayers(playerData);
        //this.playerTable.update(this.players);
    }

    _updatePlayers() {
        const playerData = this.gameData.players;
        const players = this.players;
        for (let i in playerData) {
            const fd = playerData[i].fd;
            const isLocalPlayer = this.gameData.fd === fd;
            if (fd in players) players[fd].update(playerData[i]);
            else {
                players[fd] = new Player(playerData[i]);
                if (isLocalPlayer) this.inputManager.startListen();
                if (isLocalPlayer || players.length >= this.maxPlayers) this.joinForm.hide();
            }
            if (players[fd].health === 0) {
                players[fd].onDelete();
                if (isLocalPlayer) {
                    this.inputManager.stopListen();
                    this.joinForm.show();
                }
                delete players[fd];
            }
        }
    }
}
