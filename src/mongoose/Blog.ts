import mongoose, { Schema, model } from 'mongoose'

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
	totalViews: { type: Number, default: 0 },
	catagory: { type: String, required: true },
})

export default mongoose.models.blog || model('blog', schema)
