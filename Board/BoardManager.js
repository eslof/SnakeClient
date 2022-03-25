class BoardManager {
    backgroundColors = [];
    entities = [];
    canvasManager;

    constructor(canvasManager, baseColor, seed) {
        this.canvasManager = canvasManager;
        const gridSize = canvasManager.gridSize;
        //from https://gist.github.com/blixt/f17b47c62508be59987b?permalink_comment_id=2682175#gistcomment-2682175
        const LCG=s=>()=>(2**31-1&(s=Math.imul(48271,s)))/2**31;
        const seededRandom = LCG(seed);
        for (let x = 0; x < gridSize; x++) {
            this.backgroundColors.push([]);
            for (let y = 0; y < gridSize; y++) {
                this.backgroundColors[x].push(adjustColor(baseColor, Math.floor(seededRandom() * 30)-15));
                // todo: if this turns out memory intensive (which it probably is, "#CCCCCC' * gridSize * gridSize = ...
                //  but for 50x50 that's still... 26.86 KB... maybe at 500x500 where it's 2.6mb?...
                //  also maybe: this.backgroundColors[x].push(backgroundPalette[Math.floor(seededRandom() * backgroundPalette.length)]);
                //  with a palette we can just save palette index instead
            }
        }
    }

    update(gameData) {
        const canvasManager = this.canvasManager;
        const boardData = gameData.board;
        for (let xStr in boardData) {
            const x = parseInt(xStr);
            const realX = canvasManager.translateToRealX(x);
            for (let yStr in boardData[xStr]) {
                const y = parseInt(yStr);
                const realY = canvasManager.translateToRealY(y);
                this.drawBackgroundAt(x, y, realX, realY);
                const entityKey = xStr+'.'+yStr;

                if (boardData[xStr][yStr].length === 0) {
                    delete this.entities[entityKey];
                    continue;
                }

                const entityData = boardData[xStr][yStr][0]; //for now
                this.entities[entityKey] = new EntityBase(gameData, entityData).getUpcast();
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
                this.drawBackgroundAt(x, y, realX, realY);
                const entityKey = x + '.' + y;
                if (entityKey in this.entities) this.entities[entityKey].draw(realX, realY);
            }
        }
    }

    drawBackgroundAt(gridX, gridY, realX, realY) {
        const context = this.canvasManager.context;
        const size = this.canvasManager.squareSize;
        context.beginPath();
        context.rect(realX, realY, size, size);
        context.fillStyle = this.backgroundColors[gridX][gridY];
        context.fill();
    }
}