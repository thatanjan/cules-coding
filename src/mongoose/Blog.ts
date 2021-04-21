import mongoose, { Schema, model, models } from 'mongoose'

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
	totalViews: { type: Number, default: 0 },
})

export default mongoose.models.blog || model('blog', schema)
