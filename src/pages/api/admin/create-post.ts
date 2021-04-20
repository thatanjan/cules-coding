import { Schema, model, connect } from 'mongoose'

const schema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	lastEditedAt: {
		type: Date,
	},
	content: {
		type: String,
		required: true,
	},
	tags: {
		type: [String],
	},
})

const BlogModel = model('blog', schema)

export default function handler(req, res) {
	console.log(BlogModel)
	res.status(200).json({ name: 'John Doe' })
}
