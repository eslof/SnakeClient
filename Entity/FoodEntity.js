class FoodEntity extends EntityBase {
    scoreValue;
    sizeValue;

    draw(realX, realY) {
        const context = this.canvasManager.context;
        const size = this.canvasManager.squareSize;
        realX -= size/2;
        realY -= size/2;
        context.beginPath();
        const gradient = context.createRadialGradient(realX, realY, size/10, realX-(size/2), realY-(size/2), size);

        if (this.scoreValue > 1 && this.sizeValue === 1) {
            gradient.addColorStop(0, '#ffec74');
            gradient.addColorStop(1, '#e1d800');
        } else if (this.sizeValue > 1) {
            gradient.addColorStop(0, '#90a5ee');
            gradient.addColorStop(1, '#3c4c85');
        } else {
            gradient.addColorStop(0, '#ffffff');
            gradient.addColorStop(1, '#bbbcbe');
        }

        context.arc(realX, realY, size/2, 0, 2 * Math.PI, false);
        context.fillStyle = gradient;
        context.fill();
    }
}