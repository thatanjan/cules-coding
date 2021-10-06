const convert = (num: number): string => {
	const numAfterPoint: number = 2

	if (num < 1000) return num.toString()

	if (num < 1000000) return `${(num / 1000).toFixed(numAfterPoint)}k`

	if (num < 1000000000) return `${(num / 1000000).toFixed(numAfterPoint)}m`

	return `${(num / 1000000000).toFixed(numAfterPoint)}b`
}

export default convert
