class BoardManager {
    colorPalette = [];
    colorIndexGrid = [];
    entities = [];

    constructor(baseColor, canvasManager, gameData, seed) {
        if (!Utils.isHexColor(baseColor)) throw new InternalMisuseError("Wrong parameter type for baseColor.");
        if (!(canvasManager instanceof CanvasManager)) throw new InternalMisuseError("Wrong parameter type for canvasManager.");
        if (!(gameData instanceof GameData)) throw new InternalMisuseError("Wrong parameter type for gameData.");
        if (!Number.isInteger(seed)) throw new InternalMisuseError("Wrong parameter type for seed.");

        const paletteCount = 7;
        const paletteSpread = 50;
        for (let i = 0; i < paletteCount; i++) {
            this.colorPalette.push(Utils.adjustColor(baseColor, Math.round(i * (paletteSpread / (paletteCount-1))-(paletteSpread/2))));
        }
        this.canvasManager = canvasManager;
        this.gameData = gameData;
        const gridSize = canvasManager.gridSize;
        //from https://gist.github.com/blixt/f17b47c62508be59987b?permalink_comment_id=2682175#gistcomment-2682175
        const LCG=s=>()=>(2**31-1&(s=Math.imul(48271,s)))/2**31;
        const seededRandom = LCG(seed);
        for (let x = 0; x < gridSize; x++) {
            this.colorIndexGrid.push([]);
            for (let y = 0; y < gridSize; y++) {
                this.colorIndexGrid[x].push( Math.floor(seededRandom() * this.colorPalette.length));
            }
        }
    }

    draw() {
        const canvasManager = this.canvasManager;
        const boardData = this.gameData.board;
        for (let xStr in boardData) {
            const x = parseInt(xStr);
            const realX = canvasManager.translateToRealX(x);
            for (let yStr in boardData[xStr]) {
                const y = parseInt(yStr);
                const realY = canvasManager.translateToRealY(y);
                this._drawBackgroundAt(x, y, realX, realY);
                const entityKey = xStr+'.'+yStr;

                if (boardData[xStr][yStr].length === 0) {
                    delete this.entities[entityKey];
                    continue;
                }

                const entityData = boardData[xStr][yStr][0]; //for now
                this.entities[entityKey] = new EntityBase(this.gameData, entityData).getUpcast();
                this.entities[entityKey].draw(realX, realY);
            }
        }
    }

    drawFull() {
        const canvasManager = this.canvasManager;
        const gridSize = canvasManager.gridSize;
        for (let x = 0; x < gridSize; x++) {
            const realX = canvasManager.translateToRealX(x);
            for (let y = 0; y < gridSize; y++) {
                const realY = canvasManager.translateToRealY(y);
                this._drawBackgroundAt(x, y, realX, realY);
                const entityKey = x + '.' + y;
                if (entityKey in this.entities) this.entities[entityKey].draw(realX, realY);
            }
        }
    }

    // path-sensitive function
    _drawBackgroundAt(gridX, gridY, realX, realY) {
        const context = this.canvasManager.context;
        const size = this.canvasManager.squareSize;
        context.beginPath();
        context.rect(realX, realY, size, size);
        context.fillStyle = this.colorPalette[this.colorIndexGrid[gridX][gridY]];
        context.fill();
    }
}