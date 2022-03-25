class RequestType {
    static JOIN = 1;
    static INPUT = 2;
}

class Request {
    static getInputRequest(input) {
        let ret = {};
        ret.request = RequestType.INPUT;
        ret.input = input;
        return ret;
    }

    static getJoinRequest(name) {
        let ret = {};
        ret.request = RequestType.JOIN;
        ret.name = name;
        return ret;
    }
}