import mongoose, { Schema, model } from 'mongoose'

const schema = new Schema({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
})

export default mongoose.models.outro || model('outro', schema)
