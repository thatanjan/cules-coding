---
title: Solve LeetCode problem Merge Two Sorted Lists
description:
banner: /blogs/leetcode/solve-leetcode-problem-merge-two-sorted-lists/banner.png
altText: Solve LeetCode problem Merge Two Sorted Lists
customID: E32Sz_nDROCgcaOIU2IyR
---

In this blog, we will solve the LeetCode problem [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/).

## Problem Overview

The problem is to merge two sorted linked lists and return it as a new sorted list. The new list should be made by splicing together the nodes of the first two lists.
In simple sense, we have to merge two sorted linked lists into a single sorted linked list.
For example, if the input lists are:

```
list1 = 1 -> 2 -> 4
list2 = 1 -> 3 -> 4

sortedList = 1 -> 1 -> 2 -> 3 -> 4 -> 4
```

## Video Explanation

You can find the video explanation of this problem on my YouTube channel:

## Approach

We can solve this problem using a simple iterative approach. We will create a new linked list and keep adding the smaller node from the two input lists to the new list. We will keep track of the tail of the new list and keep adding the smaller node to the tail. Once we reach the end of one of the input lists, we will add the remaining nodes of the other list to the new list.

The algorithm can be summarized as follows:

- Create a new linked list to store the merged list.

  - Initialize the new linked list with a dummy node in order to avoid handling the edge case of an empty list.
  - Initialize a tail pointer to the dummy node.
  - Initialize two pointers, `first` and `second`, to the heads of the input lists.

- Iterate through the input lists until one of the pointers reaches the end.

  - Compare the values of the `first` and `second` pointers.

    - Store the smaller node's next pointer in a temporary variable.
    - Set the smaller node's next pointer to `null`.
    - Set the tail's next pointer to the smaller node.
    - Move the tail pointer to the smaller node.

  - Move the tail pointer to its next node.

- If first is null and second is not null, set the tail's next pointer to the second pointer.
- If second is null and first is not null, set the tail's next pointer to the first pointer.
- Return the next node of the dummy node.

## Solution

```javascript
var mergeTwoLists = function (list1, list2) {
	let newList = new ListNode(false) // dummy node

	let tail = newList
	let first = list1
	let second = list2

	while (first && second) {
		// compare the values of the first and second pointers
		if (first.val < second.val) {
			let temp = first.next
			first.next = null // Remove the link to the next node
			tail.next = first // Add the smaller node to the new list
			first = temp
		} else {
			let temp = second.next
			second.next = null // Remove the link to the next node
			tail.next = second // Add the smaller node to the new list
			second = temp
		}

		tail = tail.next // Update the tail pointer
	}

	// Add the remaining nodes of the input lists to the new list
	if (!first && second) {
		tail.next = second
	}
	if (first && !second) {
		tail.next = first
	}

	return newList.next
}
```
