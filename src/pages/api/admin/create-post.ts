import connectDB from 'mongoose/connectDB'
import type { NextApiRequest, NextApiResponse } from 'next'
import BlogModel from 'mongoose/Blog'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await connectDB()

	res.status(200).json({ name: 'John Doe' })
}

export default handler
