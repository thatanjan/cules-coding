---
title: Invert Binary Tree
description:
banner: /blogs/leetcode/invert-binary-tree/banner.png
altText:
customID: ItAOhP5uqJkGAfSisXpi0
---

In this blog, we'll be solving the [Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/) problem on LeetCode.

## Problem Overview

Given the root of a binary tree, invert the tree, and return its root.

**Example 1:**
![Example 1](https://assets.leetcode.com/uploads/2021/03/14/invert1-tree.jpg)

Input: root = [4,2,7,1,3,6,9]

Output: [4,7,2,9,6,3,1]

## The Approach

You can check the video below for a detailed explanation of the approach:

<!-- <Iframe videoID="sHvm5sX3ndo" /> -->

Inverting binary trees means swapping the left and right nodes of each node in the tree. We can do this recursively by traversing the tree and swapping the left and right nodes of each node.

- Create a recursive function that takes in a node as an argument.
- If the node is null, return the node.
- Recursively call the function on the left and right nodes of the current node.
  - Store the return value of the left and right node in a variable.
- Swap the left and right nodes of the current node.
- Return the current node.

## The solution

```javascript
const traverse = node => {
	if (!node) return node

	const leftNode = traverse(node.left)
	const rightNode = traverse(node.right)

	node.left = rightNode
	node.right = leftNode

	return node
}

var invertTree = function (root) {
	return traverse(root)
}
```

## Complexity Analysis

- **Time Complexity:** O(n) - We traverse the entire tree once.
- **Space Complexity:** O(n) - The space occupied by the call stack is proportional to the height of the tree. In the worst case, the tree is linear, and the height is O(n).
