class PlayerTable {
    constructor(maxPlayers, tableElement) {
        if (!Number.isInteger(maxPlayers)) throw new InternalMisuseError("Wrong parameter type for maxPlayers.");
        if (!(tableElement instanceof HTMLElement)) throw new InternalMisuseError("Wrong parameter type for tableElement.");

        this.maxPlayers = maxPlayers;
        this.playerRows = tableElement.rows;
        this.tableElement = tableElement;
        this.resize(maxPlayers);
    }

    resize(maxPlayers) {
        if (!Number.isInteger(maxPlayers)) throw new InternalMisuseError("Wrong parameter type for maxPlayers.");

        const tableElement = this.tableElement;
        this.maxPlayers = maxPlayers;
        // adding rows up to maxPlayer count
        for (let i = tableElement.rows.length; i < maxPlayers; i++) {
            const row = tableElement.insertRow();
            row.insertCell(); // name
            row.insertCell(); // score
        }
        // removing rows if above maxPlayer count
        for (let i = maxPlayers; i < tableElement.rows.length - maxPlayers; i++) {
            tableElement.deleteRow(maxPlayers + i);
        }
    }

    update(players) {
        if (!Array.isArray(players)) throw new InternalMisuseError("Wrong parameter type for players.");

        const rows = this.playerRows;
        let i = 0;
        for (let fd in players) {
            const rowCells = rows[i].cells;
            rowCells[0].innerHTML = players[fd].name;
            rowCells[1].innerHTML = players[fd].score;
            i++;
        }

        for (i < this.maxPlayers; i++;) {
            const rowCells = rows[i].cells;
            rowCells[0].innerHTML = "";
            rowCells[1].innerHTML = "";
        }
    }
}