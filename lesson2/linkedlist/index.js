class Node {
    constructor(ele, next) {
        this.ele = ele;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.size = 0;
        this.head = null;
    }

    getNode(index) {
        let curr = this.head;
        for (let i = 0; i < index; i++) {
            curr = curr.next;
        }
        return curr;
    }
    add(index, node = {}) {

        // 省略了一个参数，默认是在链表最后添加元素
        if (arguments.length < 2) {
            node = index;
            index = this.size;
        }

        if (!this.head) {
            this.head = node;
            this.size++;
            return;
        }


        if (index < 0 || index > this.size) {
            throw new Error('add index not valid');
        }

        // 找到处理index - 1 位置的节点，然后将该节点next 指向 新增节点，新增节点的next 指向index-1 指向的节点
        const preNode = this.getNode(index - 1);
        const preNext = preNode.next;
        preNode.next = node;
        node.next = preNext;
        this.size++;
    }
}

const linkedList = new LinkedList();
linkedList.add(new Node(1));
linkedList.add(new Node(2));
linkedList.add(new Node(3));
linkedList.add(new Node(4));
linkedList.add(new Node(5));
linkedList.add(new Node(6));


console.dir(linkedList, {depth: 200});
