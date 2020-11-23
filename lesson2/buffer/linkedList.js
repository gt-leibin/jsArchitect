// 链表
// 递归 非递归的实现单项链表反转

// 单项链表
// 单向循环链表 最后一个元素指向头部
// 双向链表 两个指针分别指向前一个和后一个
// 双向循环链表 两个指针分别指向前一个和后一个  最后一个指针指向尾部 尾部指针指向头部
// 环形链表 最后一个节点指针指向其他的节点

// 从查询数据 存放数据 复杂度 O(n)


// 树状结构
// 方便查找
// 遍历 O（N）
// 二分查找

// 文件夹 DOM 路由
// 自己实现一个二叉搜索树！！！
// 树的搜索！！


// 四种遍历方式
// 先序遍历 后序遍历 中序遍历 层级遍历
// 暂时存入栈中
// 访问者模式 传入一个对象提供一个vistor,处理遍历到的节点


// 使用场景
// vdom 虚拟dom树  
// dom
// 文件系统

// 链表的操作性能比数组如何？

class Node {
    constructor(element, next) {
        this.element = element;
        this.next = next;
    }
}


class LinkedList {
    constructor() {
        this.head = null; // 头指针
        this.size = 0;
    }
    add(index, element) {
        if (arguments.length < 2) {
            element = index;
            index = this.size;
        }

        if (index > this.size) {
            index = this.size;
        }

        if (this.size < 1) {
            this.head = new Node(element, null);
        }
        else if (index === 0) {
            const newNode = new Node(element, this.head);
            this.head = newNode;
        }
        else {
            // 在第ind位置插入新的node，将原位置的前一个的next指向新插入的节点，新插入节点的next指向原节点的next
            let currentNode = this.getNode(index - 1);
            currentNode.next = new Node(element, currentNode.next || null);
        }
        this.size++;
    }
    getNode(index) {
        if (index >= this.size) {
            throw new Error('out of range');
        }

        if (this.size === 0) {
            return;
        }

        if (index <= 0) {
            return this.head;
        }

        let count = 0;
        let currentNode = this.head;
        while (count++ < index) {
            currentNode = currentNode.next;
        }
        return currentNode;

    }
    remove(index = 0) {

        if (!this.size) {
            return;
        }

        if (index <= 0) {
            const currentHead = this.head;
            this.head = currentHead.next;
            this.size--;
            return currentHead;
        }

        const currentNode = this.getNode(index);
        const pervNode = this.getNode(index - 1);
        pervNode.next = currentNode.next;
        this.size--;

        return currentNode;
    }
    // 递归实现链表反转
    reverseLinkList() {
        let reverse = node => {
            // 递归停止条件
            if (!node || !node.next) {
                return node;
            }
            // 一直回传最后一个节点
            let newnode = reverse(node.next);
            // 将下一个节点的next 指向自己
            node.next.next = node;
            // 本节点next指向为空，用于最后一个节点清空node.next
            node.next = null;
            return newnode;
        }
        this.head = reverse(this.head);
        return this.head;
    }

    // 假设原列表 A -> B -> C -> D
    // 不递归实现链表反转,
    // 负责度 O(n)
    reverseLinkList2() {
        let head = this.head;
        if (!head || !head.next) {
            return head;
        }
        let newhead = null;

        // head ->   A -> B -> C -> D
        // newhead -> null

        // head ->    B -> C -> D
        // newhead -> A -> null

        // head ->    C -> D
        // newhead  ->   B- > A -> null

        // head ->     D
        // newhead ->  C -> B- > A -> null

        // head ->     null
        // newhead ->   D -> C -> B- > A -> null
        while (head) {
            // 暂存下一个节点
            let temp = head.next;
            // 将当前节点指向新的反转后的头结点newhead
            head.next = newhead;
            // 反转后的头节点 指向当前节点

            newhead = head;
            // head当前节点后移，指向后一个节点
            head = temp;
        }
        return newhead;
    }
}

module.exports = LinkedList;
const queue = new LinkedList();
queue.add(0, 1);
queue.add(1, 2);
queue.add(2, 3);
queue.add(3, 4);
queue.add(10);
// queue.reverseLinkList2();


console.dir(queue.reverseLinkList(), {depth: 200});
// queue.remove(4);
// console.dir(queue, {depth: 200});

// console.dir(queue.getNode(0), {depth: 20});
