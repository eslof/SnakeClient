class Player {
    static colors = ['#00FF00', '#FFFF00', '#0000FF', '#00FFFF', '#FF00FF', '#FF0000'];
    bodyColor;
    fd;
    headColor;
    health;
    name;
    score;

    constructor(playerData) {
        if (!Utils.isObject(playerData)) throw new InternalMisuseError("Wrong parameter type for playerData.");

        this.update(playerData);
        const color = Player.colors.pop();
        if (!Utils.isHexColor(color)) throw new InternalMisuseError("Wrong entry in for colors.");
        this.bodyColor = color;
        this.headColor = Utils.adjustColor(color, -86);
    }

    onDelete = () => Player.colors.unshift(this.bodyColor);
    update = (playerData) => Object.assign(this, playerData);
}
