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

    constructor(gameData, entityData) {
        if (!(gameData instanceof GameData)) throw new InternalMisuseError("Wrong parameter type for gameData.");
        if (!isObject(entityData)) throw new InternalMisuseError("Wrong parameter type for entityData.");
        Object.assign(this, entityData);
        this.gameData = gameData;
    }

    draw() {
        if (Object.getPrototypeOf(this) === EntityBase.prototype) throw new InternalMisuseError("Attempting to draw entity not yet upcasted.");
        else throw new InternalMisuseError("Attempting to draw entity which has not overridden the draw() function.");
    }

    getUpcast() {
        if (Object.getPrototypeOf(this) !== EntityBase.prototype) throw new InternalMisuseError("Attempting to upcast a child instance.");
        switch (this.entityType) {
            case EntityType.Player:
                return Object.assign(new PlayerEntity(), this);
            case EntityType.Food:
                return Object.assign(new FoodEntity(), this);
        }
    }
}