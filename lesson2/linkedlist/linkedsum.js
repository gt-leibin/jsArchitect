function ListNode(val) {
    this.val = val;
    this.next = null;
}


/**
* @param {ListNode} l1
* @param {ListNode} l2
* @return {ListNode}
*/
function addTwoNumbers(l1, l2) {
    let first = null;
    let head = new ListNode();
    first = head;
    let sum = 0;
    let carry = 0;
    let temp = null;

    while (l1 || l2) {
        const v1 = l1 && l1.val || 0;
        const v2 = l2 && l2.val || 0;
        //
        sum = carry + v1 + v2;
        carry = (sum >= 10) ? 1 : 0;
        temp = new ListNode(sum % 10);
        head.next = temp;
        head = head.next;

        l1 = l1 && l1.next || null;
        l2 = l2 && l2.next || null;

    }

    if (carry) {
        head.next = new ListNode(carry);
    }

    console.dir(first.next, {depth: 200});
    return first.next;



};

l1 = {val:1,next:{val:8,next: null}}
l2 = {val:0,next:null}

addTwoNumbers(l1,l2)