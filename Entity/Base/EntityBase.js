class EntityType {
    static FOOD = 1;
    static PLAYER = 2;
}

class Direction {
    static DOWN = 1;
    static LEFT = 2;
    static RIGHT = 3;
    static UP = 4;
}

class EntityBase {
    direction;
    entityType;
    gameManager;

    constructor(gameManager, entityData) {
        if (Object.getPrototypeOf(this) !== EntityBase.prototype) return;
        if (!(gameManager instanceof GameManager)) throw new InternalMisuseError("Wrong parameter type for gameData.");
        if (!Utils.isObject(entityData)) throw new InternalMisuseError("Wrong parameter type for entityData.");
        Object.assign(this, entityData);
        this.gameManager = gameManager;
    }

    draw() {
        if (Object.getPrototypeOf(this) === EntityBase.prototype) throw new InternalMisuseError("Attempting to draw entity not yet upcasted.");
        else throw new InternalMisuseError("Attempting to draw entity which has not overridden the draw() function.");
    }

    getUpcast() {
        if (Object.getPrototypeOf(this) !== EntityBase.prototype) throw new InternalMisuseError("Attempting to upcast a child instance.");
        switch (this.entityType) {
            case EntityType.PLAYER:
                return Object.assign(new PlayerEntity(), this);
            case EntityType.FOOD:
                return Object.assign(new FoodEntity(), this);
        }
    }
}