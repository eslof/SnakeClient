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
        this.update(playerData);
        this.context = context;
        this.bodyColor = Player.colors.pop();
        this.headColor = adjustColor(this.bodyColor, -66);
    }

    onDelete=()=>Player.colors.push(this.bodyColor);
    update=(playerData)=>Object.assign(this, playerData);
}