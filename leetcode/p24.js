// Given a linked list, swap every two adjacent nodes
// and return its head.
// You must solve the problem
//  without modifying the
//  values in the list's nodes
//  (i.e., only nodes themselves may be changed.)

// https://leetcode.com/problems/swap-nodes-in-pairs/

function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

var swapPairs = function(head) {
    let dummy = new ListNode();
    let result = dummy;
    dummy.next = head;

    while (dummy.next && dummy.next.next) {
        let first = dummy.next;
        let second = dummy.next.next;
        // 把第一个点的next 指向第二个点的next
        first.next = second.next;
        // 把第二个点的next指向第一个点
        second.next = first;
        dummy.next = second;
        dummy = dummy.next.next;
    }
    return result.next;
};

// https://www.youtube.com/watch?v=AWYgewYiZXI&t=33s