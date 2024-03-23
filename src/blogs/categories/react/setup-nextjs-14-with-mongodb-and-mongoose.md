---
title: Setup Nextjs 14 with MongoDB and Mongoose
description:
banner: /blogs/react/setup-nextjs-14-with-mongodb-and-mongoose/banner.png
altText:
customID: L8l1LsSezzzCzgWTIpYbX
---

In this blog, we will learn how to set up a Next.js 14 project with MongoDB and Mongoose.
Setting up Nextjs with MongoDB can be tricky. But I will show you how to do that.

## Setup database

I will use MongoDB Atlas for this tutorial. You can use any other MongoDB service or install it locally.

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create an account.
2. Create a organization if you haven't created any and a project.
   ![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pc1d4sng01nmswc5wzz0.png)
   ![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lwhmnvppw1v4werdu5gy.png)

3. Create a cluster and choose the free tier.
   ![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/t0ddbuq1275o0ttfw923.png)
   ![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/d4seksrar4t7wuyva44o.png)

4. Create a database user and add the IP address to the IP access list.
   ![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zie1zk19ms0rhm13k1v4.png)
   ![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j8rxfx6n15qxj9wt4nyd.png)

5. Create a database and a collection. Let's call both of them `posts`
   ![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qb4va0tz0fg492l2md8a.png)
   ![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/htj34p8f5k2q7kfjowip.png)
   ![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j40tgvgwdppf4tkwm4ea.png)
   ![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4y8y4auipqeduei2wg6v.png)
   Now we have a database and a collection.

6. Get the connection string from the cluster and save it for later.
   - Go to overview button on sidebar. And then use connection method.
     ![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j7zi1pcyowkybwfwiunn.png)
     ![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rff1z3vxtlxgax2t8ydo.png)
   - Choose correct driver(nodejs latest)
   - Copy the connection string
     ![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hmwgbpfwyzojvuq0y8ll.png)

You can also checkout the video tutorial to get a better understanding.

<Iframe videoID='tFp4UhfDoQU' />

## Create a Next.js project

Use the command below to create a new Next.js project. Make sure to use app router.

```bash
npx create-next-app nextjs-mongodb
```

## Install dependencies

Install the `mongoose` package.

```bash
npm install mongoose
```

## Connect to database

Create a new `.env.local` file and add the connection string to it.

```env
MONGO_URI=your_connection_string

# Example
MONGO_URI=mongodb+srv://anjan:anjan@cluster0.est6lzg.mongodb.net/posts?retryWrites=true&w=majority
```

Replace `<password>` with database password. And add db name after `mongodb.net/` and before `?`. Check the example above.

Create a new file `db.js` and add the code below.

```javascript
// /src/app/lib/db.js

import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGO_URI

if (!MONGODB_URI) {
	throw new Error(
		'Please define the MONGODB_URI environment variable inside .env.local',
	)
}

let cached = global.mongoose

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
	if (cached.conn) {
		return cached.conn
	}
	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		}
		cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
			console.log('Db connected')
			return mongoose
		})
	}
	try {
		cached.conn = await cached.promise
	} catch (e) {
		cached.promise = null
		throw e
	}

	return cached.conn
}

export default dbConnect
```

**Explanation:**

1. With this `dbConnect` function, we are connecting to the database and caching the connection.
2. We are only connecting to the database once and reusing the connection. You don't want to connect to the database multiple times.

## Where to use `dbConnect` function?

This is a tricky question. In basic Node.js projects, you can connect to the database in the entry file `index.js` and you don't call that again.
But in Nextjs, there isn't any entry file. Because all the pages and route handlers are specific to the pages or API routes.

But now you can use the experimental feature called `instrumentation`. It will allow you to execute any startup script and this runs only once when the nextjs server starts.

Enable the `instrumentation` feature by adding the code below to the `next.config.js` file.

```javascript
module.exports = {
	experimental: {
		instrumentationHook: true,
	},
}
```

Create a new file `instrumentation.js` at the root of project or inside `src` directory if it exist. And add the code below.

```javascript
import connect from '@/lib/db'

export async function register() {
	await connect()
}
```

You just need to export the `register` function and call the `dbConnect` function inside it.

If the connection is successful, you will see the message `Db connected` in the console even before you access any page or api route.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/udjxxx4m9idixq09sfyp.png)

## What if you don't want to use `instrumentation`?

In that case, you have to call the `dbConnect` function on every page or api route where you want to access the database.

Because if you try to access the page and you don't call the connection function, you will get an error.
For example, you only call the function in the `/home/page.js` file but the first user visiting the `/about/page.js` file will get an error. Because the connection is not established yet.

Once you have a connection, you can create model to interact with the database.

## Create a model

Create a new file `post.js` and add the code below.

```javascript
import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
})

export default mongoose.models.Post || mongoose.model('Post', postSchema)
```

**Explanation:**

1. We create a new schema with `title` and `description` fields.
2. We export the model. If the model already exists, we use that. Otherwise, we create a new model.

## Add new post

Let's create a form and a server action

```javascript
export default async function Home() {
	return (
		<form action={addPost}>
			<div>
				<label>Title</label>
				<input name='title' type='text' />
			</div>
			<div>
				<label>Description</label>
				<textarea name='description' />
			</div>
			<button>Submit</button>
		</form>
	)
}
```

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/y7p3leni49omsi6jmnuf.png)

Create a server action in a separate file.

```javascript
'use server'

import Post from '@/models/Post'

const addPost = async post => {
	const title = post.get('title')
	const description = post.get('description')

	const newPost = new Post({ title, description })
	return newPost.save()
}

export { addPost }
```

**Explanation:**

1. We have a server action that will add a new post to the database.
2. It will be called when the form is submitted.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gnjlzl1aya04b6h9g5mc.png)

## Get all post

Let's create another function:

```javascript
const getPosts = async () => {
	return Post.find()
}
```

Render the posts.

```javascript
import { getPosts } from '@/actions/action'

export default async function Home() {
	const posts = await getPosts()

	return (
	    <div>
	        {posts.map(post => (
		        <div key={post._id}>
			        <h1>{post.title}</h1>
			        <p>{post.description}</p>
		        </div>
		    }
		    <form action={addPost}>
			    <div>
				    <label>Title</label>
				    <input name='title' type='text' />
			    </div>
			    <div>
				    <label>Description</label>
				    <textarea name='description' />
			    </div>
			    <button>Submit</button>
		    </form>
	    </div>
	)
}
```

Now you should get the list of posts from the database.

That's it. You have successfully set up a Next.js 14 project with MongoDB and Mongoose.
