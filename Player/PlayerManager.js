class PlayerManager {
    players = [];

    constructor(gameData, joinForm, maxPlayers, playerTable) {
        if (!(gameData instanceof GameData)) throw new InternalMisuseError("Wrong parameter type for gameData.");
        if (!(playerTable instanceof PlayerTable)) throw new InternalMisuseError("Wrong parameter type for playerTable.");
        if (!(joinForm instanceof JoinForm)) throw new InternalMisuseError("Wrong parameter type for joinForm.");
        if (!Number.isInteger(maxPlayers)) throw new InternalMisuseError("Wrong parameter type for maxPlayers.");

        this.gameData = gameData;
        this.maxPlayers = maxPlayers;
        this.playerTable = playerTable;
        this.joinForm = joinForm;
    }

    update() {
        const playerData = this.gameData.players;
        this._updatePlayers(playerData);
        this.playerTable.update(this.players);
        this.joinForm.update(this.players.length >= this.maxPlayers);
    }

    _updatePlayers() {
        const playerData = this.gameData.players;
        const players = this.players;
        for (let fd in playerData) {
            if (fd in players) players[fd].update(playerData[fd]);
            else {
                players[fd] = new Player(playerData[fd]);
            }
            if (players[fd].health === 0) {
                players[fd].onDelete();
                delete players[fd];
            }
        }
    }
}