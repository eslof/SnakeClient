class GameData {
    players;
    board;

    // path-sensitive function
    update=(data)=>Object.assign(this, JSON.parse(data));
}