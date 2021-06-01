import mongoose, { Schema, model } from 'mongoose'

const schema = new Schema({
	title: {
		type: String,
		required: true,
		text: true,
	},
	description: {
		type: String,
		required: true,
		text: true,
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
		text: true,
	},
	totalViews: { type: Number, default: 0 },
	category: { type: String, required: true, text: true },
	banner: { type: String, required: true },
	altText: { type: String, required: true, text: true },
	readingTime: { type: String, required: true },
	customID: { type: String, required: true },
})

export default mongoose.models.blog || model('blog', schema)
