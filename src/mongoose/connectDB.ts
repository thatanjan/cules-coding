import mongoose from 'mongoose'

const { MONGO_URI } = process.env

if (!MONGO_URI) {
	throw new Error('No connection string availabel on environment vatiable')
}

const globalAny: any = global

let cached = globalAny.mongoose as any

if (!cached) {
	// TODO: Need to check
	// eslint-disable-next-line no-multi-assign
	cached = globalAny.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
	if (cached.conn) {
		return cached.conn
	}

	if (!cached.promise) {
		const opts = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			bufferCommands: false,
			bufferMaxEntries: 0,
			useFindAndModify: false,
			useCreateIndex: true,
		}

		cached.promise = mongoose.connect(MONGO_URI, opts).then(mongoose => {
			return mongoose
		})
	}
	cached.conn = await cached.promise
	return cached.conn
}

export default dbConnect
