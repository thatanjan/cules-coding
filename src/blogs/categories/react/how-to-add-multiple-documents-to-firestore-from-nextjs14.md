---
title: How to add multiple documents to firestore from Nextjs14
description:
banner: /blogs/react/how-to-add-multiple-documents-to-firestore-from-nextjs14/banner.png
altText:
customID: N1Lw85oFmp6wETHoOSWT4
---

In this article, we will learn how to add multiple documents to firestore using server actions in Nextjs14. You can check my previous blog on how to add single documents from [here](https://dev.to/thatanjan/how-to-add-a-new-document-to-firestore-using-server-component-and-server-action-nextjs-14-5c8b)

## Video Tutorial

I have created a video tutorial which is a part of my [Next.js 14 Firestore series](https://youtube.com/playlist?list=PLEr-WXao6eSPsNP0_Pk4X-3jdcoTWFutb&si=NkTgE9OFRrY24fce) on YouTube. You can watch the video tutorial for a better understanding of the topic.

{% youtube 05uvGfzm5hE %}

## Firestore batch

Firestore batch is a feature that allows you to perform multiple write operations as a single unit. This is useful when you want to add multiple documents to firestore. You can use the batch to add, update, or delete multiple documents in a single batch. If any of the operations fail, the entire batch fails and no changes are made to the database.
You can use Transactions to perform both read and write operations in a single batch. You can read more about transactions [here](https://firebase.google.com/docs/firestore/manage-data/transactions)

## Create a new server action

```javascript
import posts from '@/data/posts'
import { writeBatch, doc, collection } from 'firebase/firestore'
import { db } from '@/config/firebase'

const getRandomTimestamp = () => {
	const startTimestamp = new Date('2024-01-01').getTime()
	const endTimestamp = new Date().getTime()
	const randomTimestamp = Math.floor(
		Math.random() * (endTimestamp - startTimestamp + 1) + startTimestamp,
	)
	const randomDate = new Date(randomTimestamp)

	return Timestamp.fromDate(randomDate)
}

const addMultiplePosts = async () => {
	const batch = writeBatch(db)

	posts.forEach(post => {
		const postData = {
			...post,
			createdAt: getRandomTimestamp(),
		}

		const docRef = doc(collection(db, 'posts'))
		batch.set(docRef, postData)
	})

	await batch.commit()
}
```

**Explanation**:

1. We have created a new batch using `writeBatch` from `firebase/firestore`
2. I have added a `posts.json` file in the `data` folder which contains an array of posts. You can add your own data. Or use [this](https://github.com/thatanjan/next-fire-yt/blob/final/src/data/posts.json)
3. We are iterating through the `posts` array and creating a new document reference for each post using `doc` function.
   - We are also adding a `createdAt` field with a random timestamp.
   - You can use `ServerTimeStamp` function to add the current timestamp. But you will get the same timestamp for all the documents. So I have created a `getRandomTimestamp` function to get a random timestamp between 2024 and the current date.
4. We are adding the document reference and the post data to the batch using `batch.set` function.
5. Finally, we are committing the batch using `batch.commit` function.

## Use the server action with a event handler

```javascript
'use client'
const AddPostForm = () => (
	<>
		<form action={addPost}>
			{/* Some input components */}
			<Button type='submit'>Submit</Button>
		</form>
		<Button onClick={() => addMultiplePosts()}>Add Multiple Posts</Button>
	</>
)
```

**Explanation**:

1. To use an event handler, we need a client component. However, you can create a seperate component for the button and make that a client component.
2. We have created a button to add multiple posts. When the button is clicked, the `addMultiplePosts` function will be called.
3. Make sure to don't pass the server action directly to the onClick event. You need to wrap it inside an arrow function. Otherwise, you will get an error.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/l6xg7zvikqwj9hsdqjhb.png)
![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/diui64jz3uv4ystbu93c.png)

That's it. You have successfully added multiple documents to firestore using server actions in Nextjs14. Checkout my other video tutorials on [Next.js 14 Firestore series](https://youtube.com/playlist?list=PLEr-WXao6eSPsNP0_Pk4X-3jdcoTWFutb&si=NkTgE9OFRrY24fce) on YouTube.
