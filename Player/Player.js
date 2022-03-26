class Player {
    static colors = ['#00FF00', '#FFFF00', '#0000FF', '#00FFFF', '#FF00FF', '#FF0000'];
    bodyColor;
    context;
    fd;
    headColor;
    health;
    name;
    score;

    constructor(context, playerData) {
        if (!(context instanceof CanvasRenderingContext2D)) throw new InternalMisuseError("Wrong parameter type for context.");
        if (!Utils.isObject(playerData)) throw new InternalMisuseError("Wrong parameter type for playerData.");

        this.update(playerData);
        this.context = context;
        const color = Player.colors.pop();
        if (!Utils.isHexColor(color)) throw new InternalMisuseError("Wrong entry in for colors.");
        this.bodyColor = Player.colors.pop();
        this.headColor = Utils.adjustColor(this.bodyColor, -66);
    }

    onDelete=()=>Player.colors.push(this.bodyColor);
    update=(playerData)=>Object.assign(this, playerData);
}