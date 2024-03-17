---
title: How to add documents to firestore from Nextjs14 using Server component and Server action
description:
banner: /blogs/react/how-to-add-documents-to-firestore-from-nextjs14/banner.png
altText:
customID: 8QUrJ2uW8JXGfGy85EmmT
---

In this article, we will learn how to add documents to Firestore from Next.js 14 using Server component and Server action.

## Video Tutorial

I have created a video tutorial which is a part of my [Next.js 14 Firestore series](https://youtube.com/playlist?list=PLEr-WXao6eSPsNP0_Pk4X-3jdcoTWFutb&si=NkTgE9OFRrY24fce) on YouTube. You can watch the video tutorial for a better understanding of the topic.

<Iframe videoId="KbecsTU0_CY" />

## Starter Code

You can use this [ repo ](https://github.com/thatanjan/next-fire-yt) to follow along. Use the starter branch to get the starter code.
Also I assume you have a Firestore project setup and you have the credentials to access the Firestore. You can checkout the setup video [here](https://youtu.be/Q7UKtwB2-hM?si=5NfFQQ_Qas3hwPg6).

```javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
	// Values should be replaced with your own
	apiKey: 'AIzaSyDYdXmF_MfLANTvC4bYBewFq9qh3ZdxiQY',
	authDomain: 'next-fire-yt.firebaseapp.com',
	projectId: 'next-fire-yt',
	storageBucket: 'next-fire-yt.appspot.com',
	messagingSenderId: '1098443682898',
	appId: '1:1098443682898:web:b83b4a1d160d3b17511b8b',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig) // Initializing the app

const db = getFirestore(app) // Accessing the the database

export { db }

export default app
```

## Creating a server action

Server Actions are asynchronous functions that are executed on the server. They can be used in Server and Client Components to handle form submissions and data mutations in Next.js applications.

You can create a server action inside your server component or you can create a separate file for the server action. I prefer to create a separate file.

```javascript
// utils/firebase.js
'use server'

import { db } from '@/config/firebase'
import { addDoc, collection, doc, serverTimestamp } from 'firebase/firestore'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const addPost = async formData => {
	const collectionRef = collection(db, 'posts') // Reference to the collection
	const userId = cookies().get('userId').value // Get the userId from the cookie

	const userRef = doc(db, 'users', userId)
	// const userRef = doc(db, `users/${userId}`) // Another way to get the reference

	const docRef = await addDoc(collectionRef, {
		title: formData.get('title'),
		content: formData.get('content'),
		tags: formData
			.get('tags')
			.split(',')
			.map(tag => tag.trim()),
		user: userRef,
	})

	redirect(`/post/${docRef.id}`) // Redirect to the newly created post
}

export { addPost }
```

**Explanation:**

1. 'use server' is used to tell the server that this file will contain server actions.
2. We need to create a reference to the collection where we want to add the document using `collection` function.
3. `collection` takes two arguments, the first one is the database reference and the second one is path to the collection.
4. You can get cookie value using `cookies().get('cookieName').value`. I will get the user id. Though this is not recommended, you should use a better way to get the user id. And it is optional.
5. I have created a reference to the user document using `doc` function. I want to store the user reference in the post document. So that we can have a relation between the user and the post.
6. `addDoc` function is used to add a document to the collection. It takes two arguments, the first one is the collection reference and the second one is the data to be added.
7. Server action when used with forms takes `formData` as an argument. You can get the form data using `formData.get('inputName')`. Make sure to use `name` attribute in the input fields.
8. If data is added successfully, you get document reference. You can use `docRef.id` to get the id of the newly created document.
9. I have used `redirect` function to redirect to the newly created post.

## Using the server action in the server component

You can use the server action in the server component to handle form submissions.

```javascript
const AddPostForm = () => (
	<>
		<form action={addPost}>
			{/* Some input components */}
			<Button type='submit'>Submit</Button>
		</form>
	</>
)

export default AddPostForm
```

**Explanation:**

1. You can use the server action in the form action attribute.
2. When the form is submitted, the server action is executed on the server. And you should be redirected to the newly created post.

## `setDoc` function

You can use `setDoc` function to add a document to the collection. It creates a new document with the specified data, if it doesn't exist. If the document exists, it overwrites the document with the new data. You can pass the `merge` option to merge the data.

```javascript
await setDoc(docRef, {...data})`
await setDoc(docRef, {...data}, {merge: true}) // merge with existing data
```

## Conclusion

That's it. You have learned how to add documents to Firestore from Next.js 14 using Server component and Server action. Let me know if you have any questions or suggestions. Also please consider subscribing to my channel to see more Next.js related content.
