import { NextApiRequest, NextApiResponse } from 'next'

import BlogModel from 'mongoose/Blog'
import connectDB from 'mongoose/connectDB'

const handler = async (
	{ method, query: { slug } }: NextApiRequest,
	res: NextApiResponse
) => {
	try {
		await connectDB()

		if (method === 'GET') {
			const { totalViews } = await BlogModel.findOne({ slug }, 'totalViews')

			return res.status(200).json({ totalViews })
		}
	} catch (_) {
		res.end('error happended')
	}
}

export default handler
