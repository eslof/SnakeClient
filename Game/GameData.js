class GameData {
    players;
    board;
    fd;

    // path-sensitive function
    update=(data)=>Object.assign(this, data);
}