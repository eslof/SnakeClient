class PlayerManager {
    maxPlayers;
    players;
    playerTable;
    onPlayerJoin = null;
    onPlayerLeave = null;

    constructor(playerTable, maxPlayers) {
        this.maxPlayers = maxPlayers;
        this.playerTable = playerTable;
    }

    update(playerData) {
        this.updatePlayers(playerData);
        this.updatePlayerTable();
    }

    updatePlayers(playerData) {
        const players = this.players;
        let joinCallback = this.onPlayerJoin || function () {};
        let leaveCallback = this.onPlayerLeave || function () {};
        if (!(joinCallback instanceof Function)) throw new InternalMisuseError("onPlayerJoin set to other than function or null.");
        if (!(leaveCallback instanceof Function)) throw new InternalMisuseError("onPlayerLeave set to other than function or null.");
        for (let fd in playerData) {
            if (fd in players) players[fd].update(playerData[fd]);
            else {
                players[fd] = new Player(playerData[fd]);
                joinCallback();
            }
            if (players[fd].health === 0) {
                players[fd].onDelete();
                leaveCallback();
                delete players[fd];
            }
        }
    }

    updatePlayerTable() {
        const players = this.players;
        let i = 0;
        for (let fd in players) {
            let rowCells = this.playerTable.rows[i].cells;
            rowCells[0].innerHTML = players[fd].name;
            rowCells[1].innerHTML = players[fd].score;
            i++;
        }

        for (i < this.maxPlayers; i++;) {
            let rowCells = this.playerTable.rows[i].cells;
            rowCells[0].innerHTML = "";
            rowCells[1].innerHTML = "";
        }
    }
}