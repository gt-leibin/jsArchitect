// 二叉树
class Node {
    constructor(ele, parent) {
        this.parent = parent;
        this.ele = ele;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor(compare) {
        this.root = null;
        this.size = 0;
        // // 默认用实例上的compare 也就是初始化对象的时候，如果没有 就用原型上的compare
        this.compare = compare || this.compare;
    }

    compare(ele1, ele2) {
        return ele1 - ele2;
    }

    add(ele) {
        if (!this.root) {
            this.root = new Node(ele, null);
            this.size++;
            return;
        }
        else {
            let curr = this.root;
            // 记录当前节点的父节点
            let parent = null;
            let compare = 0;
            // 查找
            while (curr) {
                // 即将插入的ele需要参与 每次二分查找，与每个节点做对比
                compare = this.compare(ele, curr.ele);
                parent = curr;
                 // 大于当前节点
                 // 如果存在下一个 curr继续循环，直到curr为空，
                 // 得到此时parent，此时parent为叶子节点
                 // 此时的curr就相当于一个指针，根据条件不断乡下挪动，直到指针指向空的节点
                if (compare > 0) {
                    curr = curr.right;
                }
                else if (compare < 0) {
                    curr = curr.left;
                }
                else {
                    curr.ele = ele;
                    break;
                }
            }
            // compare 一直记录着 当前节点与查找的节点的差值大小关系
            // 最后parent
            const newNode = new Node(ele, parent);
            this.size++;
            if (compare > 0) {
                parent.right = newNode;
            }
            else {
                parent.left = newNode;
            }
        }
    }
    // 前序遍历 为什么叫前序 是相对于跟节点来说的，先访问根节点就叫先序遍历，
    // 先访问左（右）节点，中间访问根节点 最后访问右（左）节点 叫做中序遍历
    // 先访问左（右）节点，再访问右（左）节点，最后访问根节点，叫做后序遍历

    // 用处 输出 dom结构  输出文件夹中所有内容显示  从父节点到子节点 从上到下 用于遍历输出操作
    // 场景：如果是文件夹则先显示当前文件夹，文件夹中有文件的话，则输出所有文件，
    // 如果文件夹下面还有文件夹，则继续输出子文件夹下面的文件
    preorderTravel(visitor) {
        const travel = node => {
            if (!node) {
                return;
            }
            // console.log(node.ele);
            visitor.visit(node.ele);
            travel(node.left);
            travel(node.right);
        };
        travel(this.root);
    }

    // 对于后序遍历场景  先遍历子节点最后遍历父节点 从子到父
    // 统计文件夹的大小，需要先知道文件夹下面所有文件大小，
    // 如果有子文件夹，则需要继续遍历子文件夹下面所有文件大小，才能直到父级文件夹大小

    // 删除文件夹 删除所有子文件 然后删除文件夹
    postOrderTravel(visitor) {
        const travel = node => {
            if (!node) {
                return;
            }
            travel(node.left);
            travel(node.right);
            // console.log(node.ele);
            visitor.visit(node.ele);
        };
        travel(this.root);
    }

    // 对于中序遍历 排序 中序遍历输出的内容是按照大小排好序的 先小的再中间的最后输出最大的
    indOrderTravel(visitor) {
        const travel = node => {
            if (!node) {
                return;
            }
            travel(node.left);
            // console.log(node.ele);
            visitor.visit(node.ele);
            travel(node.right);
        };
        travel(this.root);
    }

    // 按照每一层相同层数去遍历
    levelOrderTravel(visitor) {
        if (!this.root) {
            return;
        }
        let index = 0;
        let stack = [this.root];
        let curr = null;

        // 每次将左右两个子节点存入数组，然后循环该数组，
        // 继续将当前循环的节点的左右子节点加入数组中，直到找不到左右子节点，数组循环完毕为止
        while (curr = stack[index++]) {

            // console.log(curr.ele);
            visitor.visit(curr);
            if (curr.left) {
                stack.push(curr.left);
            }
            if (curr.right) {
                stack.push(curr.right);
            }
        }
    }

    // 翻转二叉树
    invertTree() {
        let stack = [this.root];
        let curr = null;
        let index = 0;
        // 还是借用层级遍历的思路，将每层的节点放在stack中，翻转当前节点的左右子节点
        // 进而导致了翻转当前节点的左右子树所有节点
        // 然后继续遍历左右子树的下层节点的左右子节点，直到所有节点遍历完毕

        // 优化递归 可以使用栈的方式！
        while (curr = stack[index++]) {
            let temp = curr.left;
            curr.left = curr.right;
            curr.right = temp;

            if (curr.left) {
                stack.push(curr.left);
            }
            else if (curr.right) {
                stack.push(curr.right);
            }
        }
    }

    predesessor(node) {
        if (node == null) return null;
        let prev = node.left;
        if (prev !== null) { // 找左子树中最右边的节点
            while (prev.right !== null) {
                prev = prev.right;
            }
            return prev;
        }
        // 当前父节点存在，并且你是父节点的左子树
        while (node.parent != null && node == node.parent.left) {
            node = node.parent;
        }
        return node.parent;
    }
}

let bst = new BST();
const arr = [10, 8, 6, 19, 15, 22, 20];
// const arr = [
//     {
//         age: 12,
//         name: 'xxx'
//     },
//     {
//         age: 6,
//         name: 'bccs'
//     },
//     {
//         age: 14,
//         name: 'ccs'
//     },
//     {
//         age: 11,
//         name: 'ccs'
//     },
//     {
//         age: 14,
//         name: 'tr'
//     },
//     {
//         age: 3,
//         name: 'otr'
//     },
//     {
//         age: 24,
//         name: 'tvvr'
//     },
//     {
//         age: 19,
//         name: 'aqvr'
//     }
// ]

arr.forEach(i => {
    bst.add(i);
});

// console.dir(bst.root, {depth: 200});
bst.levelOrderTravel({
    visit(node) {
        console.log('我是节点', node.ele);
        if (node.ele === 19) {
            console.log('当前节点19的前序节点', bst.predesessor(node));
        }
    }
});
// bst.invertTree();
// bst.levelOrderTravel({
//     visit(node) {
//         console.log('我是翻转后的节点', node.ele);
//     }
// });





