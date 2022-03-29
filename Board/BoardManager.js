class BoardManager {
    _colorPalette = [];
    _colorIndexGrid;
    entities = [];
    gameManager;

    constructor(canvasManager, colorSeed, gameData) {
        if (!(canvasManager instanceof CanvasManager)) throw new InternalMisuseError("Wrong parameter type for canvasManager.");
        if (!Number.isInteger(colorSeed)) throw new InternalMisuseError("Wrong parameter type for seed.");
        if (!(gameData instanceof GameData)) throw new InternalMisuseError("Wrong parameter type for gameData.");

        noise.seed(colorSeed);
        this.canvasManager = canvasManager;
        this.gameData = gameData;
        const paletteCount = 7;
        const paletteSpread = 50;
        const backgroundDesert = '#78d1ec';
        const backgroundGrass = '#458a32';
        this._populatePalette(backgroundDesert, paletteCount, paletteSpread, colorSeed);
        this._populatePalette(backgroundGrass, paletteCount, paletteSpread, colorSeed);
        this._populateColors(paletteCount, colorSeed);
    }

    // path-sensitive function
    // todo: probably better to send x+y with entities
    draw() {
        for (let x in this.gameData.board) {
            const realX = this.canvasManager.translateToRealX(x);
            for (let y in this.gameData.board[x]) {
                const realY = this.canvasManager.translateToRealY(y);
                this._drawBackgroundAt(x, y, realX, realY);
                const entityKey = x + '.' + y;
                const entityData = this.gameData.board[x][y];
                //TODO: we need to bring in slotType here somehow
                if (!entityData) {
                    if (entityKey in this.entities) delete this.entities[entityKey];
                    continue;
                }

                this.entities[entityKey] = new EntityBase(this.gameManager, entityData).getUpcast();
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

    _populatePalette(baseColor, paletteCount, paletteSpread) {
        for (let i = 0; i < paletteCount; i++) {
            this._colorPalette.push(Utils.adjustColor(baseColor, Math.round(i * (paletteSpread / (paletteCount - 1)) - (paletteSpread / 2))));
        }
    }

    _populateColors(paletteCount, seed) {
        const gridSize = this.canvasManager.gridSize;
        const seededRandom = Utils.LCG(seed);
        this._colorIndexGrid = new Array(gridSize);
        for (let x = 0; x < gridSize; x++) {
            this._colorIndexGrid[x] = new Uint8Array(gridSize);
            for (let y = 0; y < gridSize; y++) {
                const noiseValue = noise.simplex2(x / gridSize*2, y / gridSize*2);
                if (noiseValue > -.25) {
                    this._colorIndexGrid[x][y] = paletteCount + Math.floor(seededRandom() * paletteCount)
                } else {
                    this._colorIndexGrid[x][y] = Math.floor(seededRandom() * paletteCount);
                }
            }
        }
    }

    // path-sensitive function
    _drawBackgroundAt(gridX, gridY, realX, realY) {
        const context = this.canvasManager.context;
        const size = this.canvasManager.squareSize;
        context.beginPath();
        context.rect(realX, realY, size, size);
        context.fillStyle = this._colorPalette[this._colorIndexGrid[gridX][gridY]];
        context.fill();
    }
}
