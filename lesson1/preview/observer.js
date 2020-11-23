// 观察者模式, 被观察者状态变化后，˙及时通知观察者
// 与 订阅发布模式异同，发布订阅模式，需要先订阅某对象的行为，触发了某种行为后，一次性触发所有订阅处理事件



// 发布订阅模式 收集 事件处理器
// 内部基于发布订阅模式， 被观察者需要收集 观察者，等被观察者的行为状态发生改变，及时通知观察者。



class Subject {
    constructor (name) {
        this.name = name;
        this.state = '开心';
        this.observer = [];
    }
    setState(newState) {
        this.state = newState;
        this.observer.forEach(o => o.update(this));
    }
    // 收集观察者
    attach(o) {
        this.observer.push(o);
    }
}


class Observer {
    constructor(name) {
        this.name = name;
    }

    update(subject) {
        console.log(`${this.name} 知道 ${subject.name} ${subject.state}`);
    }
}

const baby1 = new Subject('宝宝1');
const baby2 = new Subject('宝宝2');

const fa = new Observer('爸爸');
const ma = new Observer('妈妈');

baby1.attach(fa);
baby1.attach(ma);
baby2.attach(fa);
baby2.attach(ma);

baby1.setState('拉便便');
baby2.setState('尿尿');

