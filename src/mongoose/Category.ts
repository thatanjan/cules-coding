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
	banner: { type: String, required: true },
	altText: { type: String, required: true },
	bannerRatio: { type: String, required: true },
})

export default mongoose.models.category || model('category', schema)
