class PlayerManager {
    players = [];

    constructor(gameData, joinForm, maxPlayers, playerTable) {
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