class RequestType {
    static JOIN = 1;
    static INPUT = 2;
}

class Request {
    static getInputRequest(input) {
        if (!Number.isInteger(input)) throw new InternalMisuseError("Wrong parameter type for input.");

        let ret = {};
        ret.request = RequestType.INPUT;
        ret.input = input;
        return JSON.stringify(ret);
    }

    static getJoinRequest(name) {
        if (typeof name != 'string' && !(name instanceof String)) throw new InternalMisuseError("Wrong parameter type for name.");

        let ret = {};
        ret.request = RequestType.JOIN;
        ret.name = name;
        return JSON.stringify(ret);
    }
}
