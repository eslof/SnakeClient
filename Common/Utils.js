class Utils {
    static ipToInt32 = (ip) => ip.split(".").reduce((int, v) => int * 256 + +v);
    static byId = (id) => document.getElementById(id);
    static adjustColor = (color, amount) => '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
    static isHexColor = (hex) => (typeof hex != 'string' || !(hex instanceof String))
        && hex.charAt(0) === '#'
        && hex.length === 7
        && Number.isInteger(Number('0x' + hex.substring(1)));
    static isObject = (v) => (!!v) && (v.constructor === Object);
    //from https://gist.github.com/blixt/f17b47c62508be59987b?permalink_comment_id=2682175#gistcomment-2682175
    static LCG = s => () => (2 ** 31 - 1 & (s = Math.imul(48271, s))) / 2 ** 31;
}