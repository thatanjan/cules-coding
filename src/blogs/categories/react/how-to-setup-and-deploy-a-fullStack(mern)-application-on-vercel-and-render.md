---
title: How to setup and deploy a fullStack(mern) application on Vercel and Render
description: Setting up a full-stack project and deploying that can be tricky. Let me show you how to do that.
banner: /blogs/react/how-to-setup-and-deploy-a-fullStack(mern)-application-on-vercel-and-render/banner.png
altText: In this blog, you will learn how to setup a fullStack or more specifially a mern stack application and deploy it to Vercel and Render.
customID: 8d3bc699-9717-45c3-83e1-7fe3fc24eed0
---

## Video tutorial

I have already created a video about it on my youtube channel. Check that out for more details.

<Iframe videoID='ME3tMy5Q2qo' />

If you like this video, please like share, and Subscribe to my channel.

## Setup server

We are going to build a mono repo. This means the server and the client-side code will live inside a single repository.

#### 1. Create directories

```bash
mkdir mern-app
cd mern-app
mkdir client server
cd server
```

#### 2. Initialize package.json and install dependencies

```bash
npm init -y
npm install cors dotenv express mongoose # dependencies
npm install @babel/cli @babel/core @babel/node @babel/preset-env babel-plugin-module-resolver concurrently nodemon --save-dev #dev dependencies

npm install cors dotenv express mongoose && npm install @babel/cli @babel/core @babel/node @babel/preset-env babel-plugin-module-resolver concurrently nodemon --save-dev
```

Or use a single command:

```bash
npm init -y && npm install cors dotenv express mongoose && npm install @babel/cli @babel/core @babel/node @babel/preset-env babel-plugin-module-resolver concurrently nodemon --save-dev
```

Package Explanation:

- Cors: To handle cors error
- Express: Nodejs framework
- Dotenv: For handling environment variables
- Mongoose: An ODM for MongoDB. In simple words, It is an abstraction over vanilla MongoDB SDK. It simplifies the way you interact with MongoDB and gives you much more features.
- Concurrently: It allows you to run multiple dev servers within a single terminal.
- Nodemon: To restart the dev server automatically when we will change our files.
- Babel: To compile our javascript code

#### 3. Setup Babel for absolute import(optional)

Absolute Import vs Relative Import

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/400gedk393xdn0h631ql.png)

- Create a `.babelrc` file.

```json
{
	"presets": ["@babel/preset-env"],
	"plugins": [
		[
			"module-resolver",
			{
				"root": ["./src"]
			}
		]
	]
}
```

With this, we are saying that we want `src` as our root and we always import files relative to the `src` directory.

- Create a `jsconfig.json` file inorder to have intelisense.

```json
{
	"compilerOptions": {
		"baseUrl": "./src"
	}
}
```

#### 4. Create scripts

```json
{
	"scripts": {
		"dev": "nodemon --exec babel-node src/index.js",
		"build": "babel src -d dist",
		"start": "node dist/index.js",
		"both-dev": "concurrently \"npm run dev\" \"npm --prefix ../client/ run dev\""
	}
}
```

- dev: To run the dev server with nodemon and also we always want to compile the code with babel.
- build: Compile the code with babel for production.
- start: Start the node server with the compiled code.
- both-dev: To run the both client and backend dev server in a single command.

<!-- #### 5. Setup database on MongoDB atlas -->

<!-- We are going to host our MongoDB database on [MongoDB Atlas](https://cloud.mongodb.com/). -->
<!---->
<!-- - Go to the atlas and sign in. -->
<!-- TODO: Need to finish this after creating the video -->

#### 6. Create a basic node-server

We are going to build a simple to-do application that you don't have to understand how it works.

- First, let's create a `Todo` Model. With the model, we can interact with MongoDB collections.

```javascript
import { Schema, model } from 'mongoose'

const todoSchema = new Schema({
	title: String,
})

const todoModel = model('todo', todoSchema)
export default todoModel
```

- Create the basic server. We have just created some simple API for CRUD applications.

```javascript
import { config } from 'dotenv'
import express from 'express'
import { connect as mongoConnect } from 'mongoose'
import cors from 'cors'

import Todo from 'models/Todo'

config()

mongoConnect(process.env.MONGO_URI)
	.then(() => console.log('db connected'))
	.catch(err => console.log(err))

const app = express()

// To parse the request body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// To handle cors error
app.use(cors())

app.get('/hello', (_, res) => res.send('Hello from Cules Coding'))

app.post('/addTodo', async (req, res) => {
	const { body } = req

	const newTodo = new Todo(body)
	const savedtodo = await newTodo.save()

	return res.send(savedtodo)
})

app.delete('/deleteTodo', async (req, res) => {
	const {
		body: { todoId },
	} = req

	const response = await Todo.findByIdAndDelete(todoId)
	return res.send(response)
})

app.get('/getAllTodos', async (_, res) => {
	const response = await Todo.find({})
	return res.send(response)
})

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server is running on ${port}`))
```

Now, our server is ready.

## Let's build our client application

#### 1. Create nextjs application

You don't have to use nextjs. You can also use create-react-app.

Just go to the `client` directory and run the command:

```bash
npx create-next-app@latest . --use-npm
```

You can also optionally install chakra-UI which is an awesome React UI framework. You can learn about Chakra-UI from my crash course.

<Iframe videoID='hJ873mLhmFQ'/>

I am going to use it so that the UI doesn't look terrible. Also, install Axios to make requests to our backend server.

```bash
npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^6 axios
```

#### 2. Add env variables

```
NEXT_PUBLIC_API_URL=<backend_api_url>
```

#### 3. Add the code for todo

```javascript
// pages/_app.jsx

// This is only needed if you are using chakra-UI

import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<Component {...pageProps} />
		</ChakraProvider>
	)
}

export default MyApp
```

```javascript
// pages/index.jsx

import {
	Heading,
	Center,
	Button,
	Box,
	Input,
	FormControl as Form,
} from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
})

const Home = () => {
	const [todos, setTodos] = useState([])
	const [inputVal, setInputVal] = useState('')
	const [refresh, setRefresh] = useState(false)

	const getTodos = () => {
		axiosInstance.get('/getAllTodos').then(res => setTodos(res.data))
	}

	useEffect(() => {
		getTodos()
	}, [])

	useEffect(() => {
		if (refresh) {
			getTodos()

			setTimeout(() => {
				setRefresh(false)
			})
		}
	}, [refresh])

	const deleteTodo = todoId => () => {
		axiosInstance
			.delete('/deleteTodo', {
				data: { todoId },
			})
			.then(() => setRefresh(true))
	}

	const addTodo = e => {
		e.preventDefault()
		axiosInstance.post('/addTodo', { title: inputVal }).then(() => {
			setRefresh(true)
			setInputVal('')
		})
	}

	return (
		<>
			<Heading mb={12}>MERN</Heading>

			<Form mb={10} as='form' onSubmit={addTodo}>
				<Input
					onChange={e => setInputVal(e.target.value)}
					width='300px'
					placeholder='New Todo'
					size='md'
					value={inputVal}
				/>
				<Button type='submit'>Add</Button>
			</Form>

			{todos.map(({ _id, title }) => (
				<Box key={_id} mb={10}>
					<Center w='180px' h='80px' bg='red.200'>
						{title}
					</Center>
					<Button onClick={deleteTodo(_id)}>Delete</Button>
				</Box>
			))}
		</>
	)
}

export default Home
```

The above code will just get all the todos and render them to the UI. You can also add a new todo.

So our full-stack app is now done. Now we can deploy our application. First, we will deploy our backend to Render

I would highly recommend watching the deployment part of the video to understand things clearly.

## Deploy on Render

1. Go and sign up at https://render.com/
2. Go to the dashboard and create a new web service
3. If you haven't connected your account with GitHub, please do so. And give access to Render to your repo.
4. Select the repo that you want to deploy and add the following information(required):
   - Name: Whatever you want
   - root directory: ./server
   - environment: Node
   - build command: npm install && npm run build
   - start command: npm start
5. Add an environment variable from the advanced settings

Now you will be able to deploy the application.

If your deployment is successful then you should have a log like this:

```
Dec 14 09:35:19 AM  > server@1.0.0 start /opt/render/project/src/server
Dec 14 09:35:19 AM  > node dist/index.js
Dec 14 09:35:19 AM
Dec 14 09:35:26 AM  Server is running on 10000
Dec 14 09:35:29 AM  DB connected
```

## Deploy on vercel

1. Go and sign up at https://vercel.com/
2. Go to the dashboard and create a project
3. If you haven't connected your account with GitHub, please do so. And give access to vercel to your repo.
4. Select the repo that you want to deploy and add the following information(required):
   - Name: Whatever you want
   - framework preset: Nextjs(or Whatever you are using)
   - root directory: select client from the options
5. Add the necessary environment variables like NEXT_PUBLIC_API_URL

Now you will be able to deploy the application.
