import {isObject} from './shared/util';
import {baseHandler} from './baseHandlers';
export function reactive(target) {
    // array object set map
    return createReactiveObject(target, {
        get() {},
        set() {}
    });
}

function createReactiveObject(target) {
    if (!isObject(target)) {
        return target;
    }

    const observerd = new Proxy(target, baseHandler);
    return observerd;
}