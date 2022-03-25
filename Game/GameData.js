class GameData {
    players;
    board;

    update=(data)=>Object.assign(this, JSON.parse(data));
}