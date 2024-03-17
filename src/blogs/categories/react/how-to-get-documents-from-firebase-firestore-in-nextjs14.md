---
title: How to get documents from Firebase Firestore in Nextjs14
description:
banner: /blogs/react/how-to-get-documents-from-firebase-firestore-in-nextjs14/banner.png
altText:
customID: f11ZTSftOuc0xOb3WHuyJ
---

In this blog, we will learn how to get documents from Firebase Firestore in Nextjs14. We will learn:

- How to get a collection of documents using both server and client components.
- How to revalidate the data in server components.
- How to get a single document.

## Video Tutorial

I have created a video tutorial which is a part of my [Next.js 14 Firestore series](https://youtube.com/playlist?list=PLEr-WXao6eSPsNP0_Pk4X-3jdcoTWFutb&si=NkTgE9OFRrY24fce) on YouTube. You can watch the video tutorial for a better understanding of the topic.

{% youtube chwX8tW37tI %}

## Server component

```javascript
const Home = () => {
	const collectionRef = collection(db, 'posts')
	const snapshot = await getDocs(collectionRef) // Getting the snapshot not the data itself

    // Getting the data from the snapshot and mapping it to an array
	const postList = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
    })

	return (
		<div>
			{/* rendereing the posts */}
			<PostList postList={postList} />
		</div>
	)
}
```

**Explanation:**

1. We are getting the reference to the collection `posts` from the firestore database.
2. Then passing the reference to the `getDocs` function to get the snapshot of the collection. Snapshot is not the data itself, it's the metadata of the collection.
3. Then we are mapping the `snapshot.docs` to an array of objects. We get the data from each document using `doc.data()` and the id of the document using `doc.id`.

## Server component revalidation

Server components are cached by default. Which means the data will not be fetched during build time and the page will be built with that data. So, if you change your data from console, you won't see any changes after page is built. You won't notice the changes on locally however you can test this by building your code with `npm run build`.
You need to revalidate to see the changes. You can:

- Revalidate after a certain amout of time like 1 hour, 1 day etc.
- Refetch the data on every request.
- Redeploy the app.

We will revalidate the data on every request by exoprting a variable `dynamic` from the component.

```javascript

// Avoiding cache
export const dynamic = 'force-dynamic'

const Home = () => {
	const collectionRef = collection(db, 'posts')
	const snapshot = await getDocs(collectionRef) // Getting the snapshot not the data itself

    // Getting the data from the snapshot and mapping it to an array
	const postList = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
    })

	return (
		<div>
			{/* rendereing the posts */}
			<PostList postList={postList} />
		</div>
	)
}
```

## Client component

```javascript
const Home = () => {
	const [postList, setPostList] = useState([])

	useEffect(() => {
		;(async () => {
			const postCollectionRef = collection(db, 'posts')

			const postCollectionSnapshot = await getDocs(postCollectionRef)

			const list = postCollectionSnapshot.docs.map(doc => {
				return { id: doc.id, ...doc.data() }
			})

			setPostList(list)
		})()
	}, [])

	return (
		<div>
			{/* rendereing the posts */}
			<PostList postList={postList} />
		</div>
	)
}
```

**Explanation:**

1. We are using the exact same logic but inside a `useEffect` hook.
2. Once the data is fetched, we are setting the data to the state using `setPostList`.

With client components, you don't need to worry about revalidation as the data is fetched on every request.

## Fetching a single document

```javascript
let post = null
let id = 'your-document-id'

const docRef = doc(db, 'posts', id)
const docSnap = await getDoc(docRef)

if (docSnap.exists()) {
	post = { id: docSnap.id, ...docSnap.data() }
}

if (!post) return // Handle the case when the document is not found
```

**Explanation:**

1. Again the logic is same. Just use `getDoc` function instead of `getDocs`
2. You can check if the document exists using `docSnap.exists()` method.

That's it for this blog. I hope you found it helpful. If you have any questions, feel free to ask in the comments section below.
