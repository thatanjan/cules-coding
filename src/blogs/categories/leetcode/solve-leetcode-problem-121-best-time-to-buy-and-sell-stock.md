---
title: 'Solve LeetCode problem #121 Best Time to Buy and Sell Stock'
description:
banner: /blogs/leetcode/solve-leetcode-problem-121-best-time-to-buy-and-sell-stock/banner.png
altText:
customID: DV1rphCq4oDrwn7YkQu2k
---

In this article, we will be discussing the solution to the LeetCode problem #121 - Best Time to Buy and Sell Stock.

## Problem Overview

You are given an array `prices` where `prices[i]` is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

For instance:

```
- Example 1:
  - Input: `prices = [7,1,5,3,6,4]`
  - Output: `5`
  - Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
    Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
- Example 2:
  - Input: `prices = [7,6,4,3,1]`
  - Output: `0`
  - Explanation: In this case, no transactions are done, and the max profit = 0.
```

## Solution

You can also check the video solution.

<Iframe videoID="qckl9rr1Yuc" />

The idea of stocks are that you buy them on low price and sell that on high price.
Basically we just need to find the lowest price and the highest price after that day.

The algorithm is as follows:

- Initialize the max profit and the lowest price to 0
- Loop over the array
  - Check if the index is 0
    - If yes then set the lowest price to the current price and return
    - If not then
      - Calculate the profit by subtracting the current price from the lowest prices
      - Set the lowest price to the minimum of the current price and the lowest prices
      - Set the max profit to the maximum of the profit and the max profit
- Return the max profit

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
	let maxProfit = 0
	let lowestPrice = 0

	prices.forEach((price, index) => {
		if (!index) {
			lowestPrice = price
			return
		}

		const profit = price - lowestPrice
		lowestPrice = Math.min(lowestPrice, price)
		maxProfit = Math.max(profit, maxProfit)
	})

	return maxProfit
}
```
