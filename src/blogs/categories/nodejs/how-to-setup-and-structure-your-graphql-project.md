---
title: How to Setup and Structure Your GraphQL Project
description:
banner: /blogs/nodejs/how-to-setup-and-structure-your-graphql-project/banner.png
altText: How to Setup and Structure Your GraphQL Project by Cules Coding
customID: 4c47949f-20ed-4bee-a9f5-5523be055caa
---

In this blog, you will learn how to set up a graphql project for production. Also, you will learn how to split your type definitions and resolvers into different file types.

## Note

I will assume you have a basic idea of graphql. We won't build any serious projects. I will teach you with some dummy examples. But if you know the basics, you will be able to apply them in your project.

## Video Tutorial

<Iframe VideoID='P7ViQZWhXG0' />

Please check the video to get a better understating.

## Setup

Install packages.

```bash
npm install @apollo/server graphql lodash
npm install --save-dev @babel/cli @babel/core @babel/node @babel/preset-env nodemon
```

Explanation:

1. @apollo/server, graphql: For graphql
2. Lodash: Utils library
3. @babel/core: Babel is a transcompiler that compiles js code based on the given configuration. The babel does not do anything. Plugins do.
4. @babel/preset-env: Preset is a combination of a bunch of plugins. This preset will allow us to use next-generation javascript code. Then it will be compiled down to browser and nodejs compatible code. It also adds many features.
5. nodemon: nodemon is a tool to restart the server automatically whenever we change our source code so that we don't have to do it manually.

## Setup babel and scripts

1. Create a .babelrc file and add the config

```json
{
	"presets": ["@babel/preset-env"]
}
```

2. Add the following scripts to `package.json`

```json
{
	"scripts": {
		"dev": "nodemon --exec babel-node src/index.js",
		"build": "babel src -d build",
		"start": "npm run build && node build/index.js"
	}
}
```

Let's explore the scripts:

- dev: This script will be used to start the development server. `nodemon` will automatically start the server when our code changes. But even before that `nodemon` will execute `babel-node` and will compile the `src/index.js` file.
- build: This script will be used for `production`. `babel` will compile our code from the `src` folder to the build directory. `babel` will automatically create a build directory for you if it does not exist.
- start: I will first run our build script. Then it will start our node server from the build directory.

## Setup graphql

Let's set up a simple graphql server. We will put the following code in the `src/index.js` file.

```javascript
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

const books = [
	{
		title: 'The Awakening',
		author: 'Kate Chopin',
	},
	{
		title: 'City of Glass',
		author: 'Paul Auster',
	},
]

const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`

const resolvers = {
	Query: {
		books: () => books,
	},
}

;(async () => {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
	})

	const { url } = await startStandaloneServer(server, {
		listen: {
			port: 5000,
		},
	})

	console.log(`🚀  Server ready at: ${url}`)
})()
```

Explanation:

1. We have the type definition in `typeDefs` and resolvers in `resolvers`.
2. The book query type will return the array of books.
3. In the iife, we have created a new instance of `ApolloServer`
4. Then we run the server instance with the `startStandaloneServer` method.

## Test

1. Now run the server using `npm run dev`. You should not have any errors.
2. Then go to http://localhost:5000/ and you should see the graphql playground.

This is how you can set up a graphql project. Now let me show you how you can structure your GraphQL codebase into different files and directories.

## Structuring graphql project

**Note:** There is no standard way of structuring a graphql project. You don't have to strictly follow it. You can get the basic idea from here and then you can use that in your project.

- Let's create a directory inside `src/`
- Create two more files inside the graphql directory
  - resolvers.js: It will store all the resolvers inside a single object
  - typeDefs.js: It will store all the type definitions inside an array

```bash
mkdir graphql
touch resolvers.js typeDefs.js
```

Suppose we are building a social media application.

So, we will create more directory-based features or services. For example, A social media app has users. Users can log in, log out, register, etc. So, we will create a directory for users. Then you can create directories for profiles, posts, and so on. We will just use the `user/` directory.

Inside the `user/` directory will create few more files. There we will put all user related typedefs and resolvers.

```bash
touch userResolvers.js userTypeDefs.js
```

- userTypeDefs.js

```javascript
const type = `#graphql
    type User {
    	   name: String
    	   country: String
    }

    extend type Mutation {
    	   registerUser(name: String): User
    	   loginUser(name: String): User
    	   logOutUser(name: String): User
    }
`

export default type
```

Explanation:

1. We have user type and some Mutations which will return User type.
2. Note that we are extending the `Mutation` type. There can be only one `Query` and `Mutation` type.
3. Then we export that type

Now, we will create another file `authenticateUser.js` Where we will put auth related mutation resolvers.

- authenticateUser.js

```javascript
const registerUser = (_, { name }) => {
	// action
	return { name }
}

const loginUser = (_, { name }) => {
	// action
	return { name }
}

const logOutUser = (_, { name }) => {
	// action
	return { name }
}

const resolvers = {
	Mutation: {
		registerUser,
		loginUser,
		logOutUser,
	},
}

export default resolvers
```

Explanation:

1. We first create resolvers object where we will have a Mutation(or Query) property.
2. Inside that we will put all of our resolvers function. Make sure the property names match with the mutation types.

- userResolvers.js

```javascript
import merge from 'lodash/merge'

import authenticateUser from './authenticateUser'

const userResolvers = merge(authenticateUser)

export default userResolvers
```

Explanation:

1. First we import all the user resolvers
2. Then we merge them inside an single object and export that.

- Let's go to `src/graphql/typedefs.js` file.

```javascript
import userTypeDefs from './user/userTypeDefs'

const initialTypeDefs = `#graphql
    type Query {
    _empty: String
    }

    type Mutation {
    _empty: String
    }
`

const typeDefs = [initialTypeDefs, userTypeDefs]

export default typeDefs
```

Explanation:

1. We are creating the initial `Query` and `Mutation` type.
2. Like I have mentioned before, there can be only one `Query` and `Mutation` type and we always extend them.
3. We create a new array `typedefs`. We add all the typedefs to the to that array.

- `src/index.js`

```javascript
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers'
;(async () => {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
	})

	const { url } = await startStandaloneServer(server, {
		listen: {
			port: 5000,
		},
	})

	console.log(`🚀  Server ready at: ${url}`)
})()
```

Explanation:

1. Now, we just import that typedefs and resolvers and add them to the `ApolloServer` instance.

## Final Code structure

Again you don't have to follow the exact same structure.

```
├── package.json
├── package-lock.json
└── src
    ├── graphql
    │   ├── resolvers.js
    │   ├── typeDefs.js
    │   └── user
    │       ├── authenticateUser.js
    │       ├── userResolvers.js
    │       └── userTypeDefs.js
    └── index.js
```
