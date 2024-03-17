---
title: Solve Maximum Depth of Binary Tree problem in Javascript
description:
banner: /blogs//solve-maximum-depth-of-binary-tree-problem-in-javascript/banner.png
altText:
customID: b-i8asLx6nkAQuOVuLQam
---

## What is max depth of a binary tree?

The maximum depth of a binary tree is the number of nodes along the longest path from the root node down to the farthest leaf node.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lxjc4vqd25oet403b6pd.png)

## Approach

A binary tree is consist of multiple sub binary trees. A single node is also a binary tree. Both of them are valid binary trees.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3ht15nbrbil60mqi69is.png)

So, let's solve the problem for a sub binary tree.

A binary tree can have depth from left side and right side.

- If there is single node, then the left and right depth will be 0.
- If there are two nodes(root and left), then the left depth will be 1 and right depth will be 0.
- If there are two nodes(root, left and right), then the left and right depth will be 1.

Since you want the max depth of the binary tree, you would take the max of left and right depth. You need to add 1 for the parent node.

The equation would be:

```
maxDepth = Math.max(leftDepth, rightDepth) + 1
```

If we solve the problem for all the sub binary trees, then we will end up in root node. And we will have left and right depth of the root node. We will take the max of left and right depth and add 1 to get the max depth of the binary tree.

To solve the problem, we will use Depth First Search(DFS) algorithm using a recursive approach.

## Pseudocode

- Create a function called `traverse` which takes a root node as an argument.
- If the root node is null, then return 0.
- Recursively call the `traverse` function for left and right nodes.
- Take the max of left and right depth and add 1 to get the max depth of the sub binary tree.
- Return the result.

## Solution

```javascript
var maxDepth = function (root) {
	const traverse = node => {
		if (!node) return 0

		const leftResult = traverse(node.left)
		const rightResult = traverse(node.right)

		const result = Math.max(leftResult, rightResult) + 1

		return result
	}

	return traverse(root)
}
```
