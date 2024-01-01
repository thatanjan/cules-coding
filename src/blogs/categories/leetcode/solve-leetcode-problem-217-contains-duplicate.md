---
title: 'Solve LeetCode problem #217 Contains Duplicate'
description:
banner: /blogs/leetcode/solve-leetcode-problem-217-contains-duplicate/banner.png
altText: 'LeetCode problem #217 Contains Duplicate @thatanjan @culesCoding'
customID: 9FMmiM8hk2ysf2zm2JNSz
---

In this article we will be discussing the solution to the LeetCode problem #217 Contains Duplicate.

## Problem Description:

Given an integer array `nums`, return true if any value appears at least twice in the array, and return false if every element is distinct.

```
Example 1:

Input: nums = [1,2,3,1]
Output: true

Example 2:

Input: nums = [1,2,3,4]
Output: false

Example 3:

Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true
```

## Solution

You can also check the video solution.

<Iframe videoID="qckl9rr1Yuc" />

To know if all the characters are the same we have to loop over the entire strings. We can use a hash map to store the count of each character in the string.

The algorithm is as follows:

- Loop over the array
  - Check if the current number exists in the cache
    - If yes then return true
    - If not then add it to the cache

## Code

```javascript
var containsDuplicate = function (nums) {
	const cache = {}

	for (const num of nums) {
		if (num in cache) return true

		cache[num] = 1
	}

	return false
}
```

## Complexity

Time Complexity: O(n) - We are looping over the entire array

Space Complexity: O(n) - We are storing the entire array in the cache
