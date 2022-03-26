class InternalMisuseError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InternalMisuseError';
    }
}