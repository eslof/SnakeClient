class CanvasManager {
    squareSize;
    squareDistance;
    marginX;
    marginY;

    constructor(canvas, gridSize) {
        if (!(canvas instanceof HTMLElement)) throw new InternalMisuseError("Wrong parameter type for canvas.");
        if (!Number.isInteger(gridSize)) throw new InternalMisuseError("Wrong parameter type for gridSize.");

        this.context = canvas.getContext('2d');
        this.canvas = canvas;
        this.gridSize = gridSize;
        this.update();
    }

    clear=()=>this.context.clearRect(0,0,this.canvas.width,this.canvas.height);

    update() {
        this._updateMeasurements();
        this._updateCanvasSize();
    }

    translateToRealX(gridX) {
        return -this.marginX + (gridX * this.squareDistance);
    }

    translateToRealY(gridY) {
        const alignTop = false;
        return (alignTop ? 0 : -this.marginY) + (gridY * this.squareDistance);
    }

    translateToReal(x, y) {
        const realX = -this.marginX + (x * this.squareDistance);
        const alignTop = false;
        const realY = (alignTop ? 0 : -this.marginY) + (y * this.squareDistance);
        return [realX, realY];
    }

    _updateCanvasSize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const canvas = this.canvas;
        canvas.style.height = height+'px';
        canvas.style.width = width+'px';
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        canvas.width = width;
        canvas.height = height;
    }

    _updateMeasurements() {
        const maxGridSize = Math.min(window.innerHeight, window.innerWidth);
        this.marginX = (maxGridSize - window.innerWidth) / 2;
        this.marginY = (maxGridSize - window.innerHeight) / 2;
        this.squareDistance = maxGridSize / this.gridSize;
        this.squareSize = Math.round(this.squareDistance+1); // TODO: figure out what causes the gaps
    }
}