---
title: How to update documents in Firebase Firestore and Nextjs14
description:
banner: /blogs/react/how-to-update-documents-in-firebase-firestore-and-nextjs14/banner.png
altText:
customID: 349tEOo2d343e4gONOWps
---

In this article, we will learn how to update documents in Firebase Firestore and Nextjs14 using server action

## Video Tutorial

I have created a video tutorial which is a part of my [Next.js 14 Firestore series](https://youtube.com/playlist?list=PLEr-WXao6eSPsNP0_Pk4X-3jdcoTWFutb&si=NkTgE9OFRrY24fce) on YouTube. You can watch the video tutorial for a better understanding of the topic.

{% youtube L4SOb0Uh3OE %}

## Create a new server action

```javascript
const updatePost = async (postId, formData) => {
	const docRef = doc(db, 'posts', postId)

	await updateDoc(docRef, {
		title: formData.get('title'),
		content: formData.get('content'),
		tags: formData
			.get('tags')
			.split(',')
			.map(tag => tag.trim()),
	})
}
```

**Explanation:**

1. We are creating a new server action called `updatePost` which takes two parameters `postId` and `formData`.
2. Creating a reference to the document we want to update using `doc` method.
3. Updating the document using `updateDoc` method.
4. We are getting the data from the form using `formData.get` method.
5. You only need to pass the fields you want to update.

## Usage

We will use the server action with a form.

```javascript
const Form = () => {
	const id = 'your-post-id'

	return (
		<form action={updatePost.bind(null, id)}>
			{/* inputs */}
			<button type='submit' w='100%'>
				Submit
			</button>
		</form>
	)
}
```

**Explanation:**

1. Pass the server action to the form action.
2. You can get the post id from the URL or any other way.
3. To pass multiple parameters to the server action, you can use `bind` method. First parameter is `null` and the second parameter is the `postId`.

## Update array fields

```javascript
const updateData = {
	tags: arrayUnion('new-tag'),
	tags: arrayRemove('new-tag'),
}
```

**Explanation:**

1. `arrayUnion` is used to add an item to an array field.
2. `arrayRemove` is used to remove an item from an array field.

That's it. You can check my entire video series on Firebase Firestore and Next.js 14 on [YouTube](https://youtube.com/playlist?list=PLEr-WXao6eSPsNP0_Pk4X-3jdcoTWFutb&si=NkTgE9OFRrY24fce). Consider subscribing to my channel for more such content.
