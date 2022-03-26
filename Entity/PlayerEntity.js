class PlayerType {
    static BODY = 1;
    static HEAD = 2;
}

class PlayerEntity extends EntityBase {
    fd;
    playerType;

    draw(realX, realY) {
        if (this.playerType === PlayerType.HEAD) this._drawHead(realX, realY);
        else if (this.playerType === PlayerType.BODY) this._drawBody(realX, realY)
    }

    _drawBody(realX, realY) {
        const canvasManager = this.gameManager.canvasManager;
        const players = this.gameManager.playerManager.players;
        const context = canvasManager.context;
        const size = canvasManager.squareSize;
        realX -= size;
        realY -= size;
        context.beginPath();
        context.rect(realX, realY, size, size);
        context.fillStyle = players[this.fd].bodyColor;
        context.fill();
    }

    _drawHead(realX, realY) {
        const canvasManager = this.gameManager.canvasManager;
        const players = this.gameManager.playerManager.players;
        const context = canvasManager.context;
        const size = canvasManager.squareSize;
        realX -= size/2;
        realY -= size/2;
        const direction = this.direction;
        const rotateAngle = (Math.PI / 180) * (
            direction === Direction.LEFT ? 90
                : direction === Direction.RIGHT ? 270
                    : direction === Direction.UP ? 180
                        : 0
        );
        if (rotateAngle > 0) {
            context.save();
            context.translate(realX, realY);
            context.rotate(rotateAngle);
            context.moveTo(0, 0);
            realX = 0;
            realY = 0;
        }

        context.beginPath();
        context.arc(realX, realY, size/2, 0, Math.PI);
        context.lineTo(realX-(size/2), realY-(size/2));
        context.lineTo(realX+(size/2), realY-(size/2));
        context.closePath();
        context.fillStyle = players[this.fd].headColor;
        context.fill();
        if (rotateAngle > 0) context.restore();
    }
}