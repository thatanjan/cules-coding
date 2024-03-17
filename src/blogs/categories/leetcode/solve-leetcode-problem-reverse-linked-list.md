---
title: Solve LeetCode problem Reverse Linked List
description:
banner: /blogs//solve-leetcode-problem-reverse-linked-list/banner.png
altText:
customID: OexFfGSRPcon-gvdZxWgH
---

In this blog, we'll be solving the [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/) problem on LeetCode.

## The Approach

The goal is to reverse a given linked list, transforming it from its original order to the reverse order.

### Step 1: Check Base Cases

We start by checking if the linked list is either empty or contains only one node. If so, there's no need to reverse it, and we return the original list.

### Step 2: Initialization

We initialize three pointers: `prevNode`, `nextNode`, and `temp`.

- `prevNode`: Initially points to the head of the linked list.
- `nextNode`: Points to the next node after `prevNode`.
- `temp`: Temporary pointer to hold the next node in the list.

### Step 3: Reversing the List

While there's a `nextNode` present:

1. Store the `nextNode`'s next pointer in `temp`.
2. Update `nextNode`'s next pointer to point back to `prevNode`, reversing the pointer direction.
3. Move `prevNode` and `nextNode` pointers one step forward:
   - Update `prevNode` to the current `nextNode`.
   - Update `nextNode` to the stored `temp` value.

### Step 4: Final Result

Repeat the process until there are no more nodes left to traverse (`nextNode` becomes `null`). At this point, `prevNode` will be pointing to the new head of the reversed list.

## The JavaScript Solution

Here's the JavaScript solution implementing the above steps:

```javascript
var reverseList = function (head) {
	if (!head || !head.next) return head

	let prevNode = head
	let nextNode = prevNode.next
	prevNode.next = null

	while (nextNode) {
		const temp = nextNode.next
		nextNode.next = prevNode
		prevNode = nextNode
		nextNode = temp
	}

	return prevNode
}
```
