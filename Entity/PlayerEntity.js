class PlayerType {
    static Body = 1;
    static Head = 2;
}

class PlayerEntity extends EntityBase {
    fd;
    playerType;

    draw(realX, realY) {
        if (this.playerType === PlayerType.Head) this.drawHead(realX, realY);
        else if (this.playerType === PlayerType.Body) this.drawBody(realX, realY)
    }

    drawBody(realX, realY) {
        const canvasManager = this.gameData.canvasManager;
        const players = this.gameData.playerManager.players;
        const context = canvasManager.context;
        const size = canvasManager.squareSize;
        realX -= size;
        realY -= size;
        context.beginPath();
        context.rect(realX, realY, size, size);
        context.fillStyle = players[this.fd].bodyColor;
        context.fill();
    }

    drawHead(realX, realY) {
        const canvasManager = this.gameData.canvasManager;
        const players = this.gameData.playerManager.players;
        const context = canvasManager.context;
        const size = canvasManager.squareSize;
        realX -= size/2;
        realY -= size/2;
        const direction = this.direction;
        const rotateAngle = (Math.PI / 180) * (
            direction === Direction.Left ? 90
                : direction === Direction.Right ? 270
                    : direction === Direction.Up ? 180
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