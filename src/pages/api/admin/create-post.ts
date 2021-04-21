import connectDB from 'mongoose/connectDB'
import type { NextApiRequest, NextApiResponse } from 'next'
import BlogModel from 'mongoose/Blog'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await connectDB()

	const { method, body } = req

	console.log(body)
	if (method !== 'POST')
		return res.status(400).json({ errorMessage: 'no route other than post' })

	res.status(200).json({ name: 'John Doe' })
}

export default handler
