---
title: Fetch API crash course
description:
banner: /blogs/javascript/fetch-api-crash-course/banner.png
altText: Fetch API crash course in Cules Coding by @thatanjan
customID: YpoV6V4TdwYOiG-jHax5l
---

In this article, I will be explaining the basics of the Fetch API.

## What is Fetch API?

Fetch API is a new API introduced in the latest version of the [JavaScript](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) specification.
With the help of Fetch API, we can make HTTP requests and get the response from the server.

For example, you want to get some user data from the server, you can use the Fetch API to make the request and get the response.

With Fetch API, you can use these methods:
- GET: The GET method requests a representation of the specified resource. Requests using GET should only retrieve data.
- HEAD: The HEAD method asks for a response identical to a GET request, but without the response body.
- POST: The POST method submits an entity to the specified resource, often causing a change in state or side effects on the server.
- PUT: The PUT method replaces all current representations of the target resource with the request payload.
- DELETE: The DELETE method deletes the specified resource.

## Fetch API basics

We will use [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API to demonstrate the basics of the Fetch API.

## Fetch data from the server using Fetch API

```javascript
const url = 'https://jsonplaceholder.typicode.com/users'

const getUsers = async () => {
	const response = await fetch(url, {})
	const data = await response.json()

	console.log(data) // output is an array of objects
}

getUsers()
```

Explanation:

-   We are trying to get some random users from the server.
-   `url` is The URL of the resource that is to be fetched.
-   fetch function always returns a promise. I am going to `async` function. Feel free to use `.then()` and `.catch()` methods.
-   `fetch` method takes two arguments: url and options which are optional.
-   By default, the `fetch` method will make a GET request.
-   Fetch gives us a response object. But that doesn't hold the actual data. We need to use `.json()` method to get the data. If you don't know about JSON, I have a video about it. Feel free to check that out.
-   That's it. You can see the output in the console.

## Add new data to the server using Fetch API

```javascript
const url = 'https://jsonplaceholder.typicode.com/users'

const addNewUser = async () => {
	try {
		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				name: 'Jane',
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})

		const data = await response.json()

		console.log(response)
	} catch (e) {
		console.log(e)
	}
}
```

-   This time we are trying to add a new user to the server. It will not add a new user to the server. It will just mimic the process and will return a response object.
-   We need to use the `POST` method.
-   The body is the data that we want to send to the server. We can not send JSON data directly to the server. We need to convert it to string first. We can use `JSON.stringify()` method to convert it to string.
-   We need to set the `Content-Type` header to `application/json`.
-   Then we have to repeat the same process as the previous example.

## Error handling using Fetch API

Error handling is a little bit different in the Fetch API. It will complete the whole process even if there is an error. Except you get disconnected or any network error happens.
Let's see how we can handle the error.

Same as the previous example, but this time I will mess up with the URL.

```javascript
const url = 'https://jsonplaceholder.typicode.com/users'

const addNewUser = async () => {
	try {
		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				name: 'Jane',
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (!response.ok) {
			throw new Error(response.statusText)
		}

		const data = await response.json()

		console.log(response)
	} catch (e) {
		console.log(e)
	}
}
```

Explanation:

-   The response object has a `.ok` property. If it is `false`, that means there is an error.
-   Then we can throw an error.
-   The `.catch()` method wil catch the error and print it in the console.
