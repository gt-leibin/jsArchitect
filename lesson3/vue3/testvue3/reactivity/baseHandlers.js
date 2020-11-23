const get = createGetter();
const set = createSetter();

function createGetter () {
    return function get(tar, key, receiver) {
        const res =  Reflect.get(tar, key, receiver); // target[key]
        console.log('取值', tar, key);
        return res;
    };
}

function createSetter() {
    return function set(tar, key, val, receiver) {
        const res = Reflect.set(tar, key, val, receiver);
        console.log('从对象上设值', tar, key, val);
        return res;
    }
}


export const mutableHandler = {
    get,
    set
};
