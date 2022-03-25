class EntityType {
    static Food = 1;
    static Player = 2;
}

class Direction {
    static Down = 1;
    static Left = 2;
    static Right = 3;
    static Up = 4;
}

class EntityBase {
    direction;
    entityType;

    constructor(gameData, entityData, realX, realY) {
        Object.assign(this, entityData);
        this.gameData = gameData;
        this.realX = realX;
        this.realY = realY;
    }

    getUpcast() {
        if (Object.getPrototypeOf(this) !== EntityBase.prototype) return this;
        switch (this.entityType) {
            case EntityType.Player:
                return Object.assign(new PlayerEntity(), this);
            case EntityType.Food:
                return Object.assign(new FoodEntity(), this);
        }
    }
}