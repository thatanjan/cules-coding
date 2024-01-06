---
title: 'Solve LeetCode problem #125 Valid Palindrome'
description:
banner: /blogs/leetcode/solve-leetcode-problem-125-valid-palindrome/banner.png
altText:
customID: t0VBz3T0oQ-sQ9Eas6TQp
---

In this blog, we'll be solving the [Valid Palindrome](https://leetcode.com/problems/valid-palindrome/) problem on LeetCode.

### Problem Overview

The task is to check whether a given string is a valid palindrome, considering alphanumeric characters and ignoring cases.

A palindrome is a string that reads the same backward as forward.

### Example:

For instance, consider the string: `"A man, a plan, a canal: Panama"`.

- After sanitization, removing non-alphanumeric characters and converting to lowercase, the string becomes `"amanaplanacanalpanama"`.
- This sanitized string is a valid palindrome because if you read it backward, it's the same as reading it forward.

Other examples are 'aba', 'abba', 'racecar', etc.

### Approach

Check the video solution:

<Iframe videoID="RgjBHcGen3I" />

The solution employs a two-pointer technique:

1. **Sanitization:** The input string is sanitized by removing non-alphanumeric characters and converting it to lowercase.
2. **Pointers:** Initialize two pointers, `left` at the start and `right` at the end of the sanitized string.
3. **Comparison:** Iterate through the string while `left <= right`.
   - Compare characters at `left` and `right`.
   - If they don't match, return `false`.
   - Move `left` pointer forward and `right` pointer backward.
4. If the comparison continues without mismatch, return `true`.

### JavaScript Solution

Here's the JavaScript solution implementing the described approach:

```javascript
var isPalindrome = function (s) {
	const sanitaizedString = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()

	let left = 0
	let right = sanitaizedString.length - 1

	while (left <= right) {
		const leftChar = sanitaizedString[left]
		const rightChar = sanitaizedString[right]

		if (leftChar !== rightChar) return false

		left++
		right--
	}

	return true
}
```
