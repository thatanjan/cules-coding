---
title: Upload images from React and Node app to Cloudinary
description: In this tutorial, we will learn how to upload images from a React and Node app to Cloudinary.
banner: /blogs/react/upload-images-from-react-and-Node-app-to-cloudinary/banner.png
altText: Upload images from React and Node app to Cloudinary by Cules Coding
customID: b3ac4f02-6ba5-4f87-9315-26df15b5efc6
---

## Requirements

Before you follow this tutorial, you need to know a few things:

-   JavaScript
-   React
-   Node.js

You don't need to be advanced in them but basic knowledge is required.

It will be great if you know about the followings:

-   Fastify(Node framework)
-   Chakara UI(React UI framework)

But you can learn about them from my channel.

<Iframe videoID='hJ873mLhmFQ' />

<Iframe videoID='k4FG29N8wg8' />

## Setup

First, we are going to work on the react app.

```bash
mkdir react-node-uploader-yt
cd react-node-uploader-yt

git init # Optional

npx create-react-app client
cd client
```

Install necessary packages:

```bash
npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion react-dropzone axios
```

-   First packages are all related to Chakra UI.
-   react-dropzone: A react library for drag and drop file upload.
-   Axios: A library for making HTTP requests.

## Setup Chakara UI

Open up the `src/index.js` file and surround the `App` component with the `ChakraProvider` component.

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'

import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<React.StrictMode>
		<ChakraProvider>
			<App />
		</ChakraProvider>
	</React.StrictMode>
)
```

Add the following code to the `src/App.js` file:

```javascript
import { Heading } from '@chakra-ui/react'

import Uploader from './components/Uploader' // Does not exist for now

const App = () => {
	return (
		<div>
			<Heading fontSize='5xl' align='center' py={20}>
				Cules Uploader
			</Heading>

			<Uploader />
		</div>
	)
}

export default App
```

![image](https://user-images.githubusercontent.com/71136371/185736794-72186e29-a4f3-4604-9c5f-a827d145b565.png)

## Create Uploader Component

Create a new component called `Uploader`.

```javascript
import React, { useState, useEffect } from 'react'
import { Box, Text, Image as ChakraImage, Button } from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'

const Uploader = () => {
	const [file, setFile] = useState({})

	const setFileState = data => setFile(p => ({ ...p, ...data }))

	const handleSubmit = async () => {
		try {
			const { base64, height, width } = file

			const url = 'http://localhost:8000/upload'

			const { data } = await axios.post(url, {
				src: base64,
				height,
				width,
			})

			console.log(data)
		} catch (error) {
			console.log(error.response.data.message)
		}
	}

	const onDrop = acceptedFiles => {
		const fileObject = acceptedFiles[0]

		const preview = URL.createObjectURL(fileObject)
		setFileState({ fileObject, preview })
		// Do something with the files

		const image = new Image()

		image.src = preview

		image.onload = () =>
			setFileState({
				width: image.width,
				height: image.height,
			})

		const reader = new FileReader()

		reader.onabort = () => console.log('file reading was aborted')

		reader.onerror = () => console.log('file reading has failed')

		reader.readAsDataURL(fileObject)

		reader.onload = () => setFileState({ base64: reader.result })
	}

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		maxFiles: 1,
		accept: {
			'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
		},
	})

	useEffect(() => () => URL.revokeObjectURL(file.preview), [file.preview])

	return (
		<Box m='0 auto' maxW='50rem' w='80%'>
			{file.preview ? (
				<ChakraImage src={file.preview} alt='' w='100%' />
			) : (
				<Box
					display='grid'
					placeItems='center'
					minH='15rem'
					border='1px dashed black'
					{...getRootProps()}
				>
					<input {...getInputProps()} />
					<Text>
						{isDragActive
							? 'Release to drop the files here'
							: "Drag 'n' drop some files here, or click to select files"}
					</Text>
				</Box>
			)}

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-around',
					mt: '1rem',
				}}
			>
				<Button onClick={() => setFile({})}>Reset</Button>
				<Button onClick={handleSubmit}>Submit</Button>
			</Box>
		</Box>
	)
}

export default Uploader
```

![image](https://user-images.githubusercontent.com/71136371/185737104-e22a0643-be83-4e29-bd1e-2775a26843e3.png)

Explanation:

-   The `file` state is used to store the file object.
-   Use the `useDropzone` hook to create a dropzone component. Spread the necessary props to the `<input>` and its parent element.
-   The `onDrop` function is used to handle the drop event.

    -   First, we are getting the actual image file from the `files` array. Then we create a preview link with `URL.createObjectURL` and set the state with the file object and preview link.
    -   We then create an image object and set the source to the preview link. We are doing this to get the width and height of the image.
    -   Finally, we will convert our image to base64 string with `FileReader`. base64 string will be sent to the node server. It will be stored inside Cloudinary.
    -   All image data will be stored inside the file state.

-   The JSX is pretty simple. We create a container as the root and an input element inside that. The dropzone props will be spread out inside the components.
-   Last two buttons are for resetting the state and Submitting the image to our backend server. The submit button is hooked up with the `handleSubmit` function.
-   `handleSubmit` function will send the `base64` image to our backend server.

## Build backend server

Let's create a new directory at the root and initialize a package.json file.

```bash
mkdir server
cd server
npm init -y
```

## Install packages

For dependencies

```bash
npm i @fastify/cors @fastify/formbody cloudinary dotenv fastify
```

Explanation:

-   fastify: Fastify core package.
-   @fastify/cors: Handling cors.
-   @fastify/formbody: Handling Form URL encoded request body.

For devDependencies

```bash
npm i concurrently nodemon --save-dev
```

Explanation:

-   concurrently: Handles multiple scripts with the same command.
-   nodemon: Restart the dev server when files are changed.

## Add new scripts to `package.json`:

```json
{
	"scripts": {
		"dev": "nodemon ./src/index.js",
		"client-dev": "npm --prefix ../client/ run start",
		"both-dev": "concurrently \"npm run client-dev\" \"npm run dev\""
	}
}
```

## Add environment variables

```
CLOUDINARY_CLOUD_NAME=<your key>
CLOUDINARY_API_KEY=<your key>
CLOUDINARY_API_SECRET=<your key>
```

You can find your keys from your Cloudinary dashboard.

## Setup basic node server

Create a new `index.js` file

```bash
touch index.js
```

Add the following code. You can see it is pretty similar to Express.

```javascript
import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyFormBody from '@fastify/formbody'
import { config } from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'

config()

const app = fastify({
	logger: true,
	bodyLimit: 1024 * 1024 * 10,
})

app.register(fastifyCors)
app.register(fastifyFormBody)

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

const PORT = process.env.PORT || 8000

app.listen({ port: PORT }).catch(err => app.log.error(err))
```

Explanation:

-   First, we create a fastify app. We set a body limit of 10MB.
-   We also register the fastify plugins.
-   Then we configure the cloudinary with the api keys.
-   Finally, we start the server with `app.listen`.

## Create upload route

```javascript
app.post('/upload', async (req, reply) => {
	try {
		const { src, height, width } = req.body

		const folder = '/cules-uploader/'

		const imageConfig = {
			width,
			height,
			folder,
			crop: 'fit',
			quality: 80,
		}

		const uploadRes = await cloudinary.uploader.upload(src, imageConfig)

		return { success: true, data: uploadRes }
	} catch (error) {
		const message = error.message

		return reply.status(400).send({ success: false, message })
	}
})
```

Explanation:

-   First, extract the properties from the request body.
-   We need to specify a folder path where we want to store the image.
-   Create an image config object where we need to specify all the information about the image. You can find the available options [here](https://cloudinary.com/documentation/image_upload_api_reference#upload)
-   Finally, we use the `upload` method to upload the image. And if everything goes well then we will send a successful response.

That's it our app is done. Now you will be able to upload images from your react app.
