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

		if (method === 'POST') {
			const update = await BlogModel.updateOne(
				{ slug },
				{
					$inc: {
						totalViews: 1 as never,
					},
				}
			)

			if (update.nModified > 0) {
				return res.status(200).json({ success: true })
			}

			return res.status(400).json({ message: true })
		}
	} catch (_) {
		res.end('error happended')
	}
}

export default handler
