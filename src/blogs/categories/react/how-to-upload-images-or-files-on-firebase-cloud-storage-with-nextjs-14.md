---
title: How to upload images or files on Firebase Cloud Storage with Nextjs 14
description:
banner: /blogs/react/how-to-upload-images-or-files-on-firebase-cloud-storage-with-nextjs-14/banner.png
altText:
customID: LR9homXr8KhlimLq_n-_C
---

In this tutorial, we will learn how to upload images or files on Firebase Cloud Storage with Nextjs 14.

## Video Tutorial

You can watch the video tutorial for a better understanding.

{% youtube hrlmbRo1iOQ %}

## What is Firebase Cloud Storage?

Firebase is a Backend-as-a-Service (BaaS) that provides a number of services like authentication, real-time database, cloud functions, and cloud storage is one of them. In cloud storage, you will be able to store media files like images, videos, pdfs and so on.
Firebase storage works similary to local file system. You can create directories and store files in them. You can also nest directories inside other directories.
Like local system, you also have path to the file in the cloud storage. I.E `images/2022/01/01/my-image.png`, `videos/2022/01/01/my-video.mp4`, etc.

I will use Nextjs but you can use any other frontend framework like React, Angular, Vue, etc.

## Setup

I would recommend watching the video tutorial for a better understanding.

1. Create a new project on [Firebase](https://console.firebase.google.com/).
2. Create a new web app and copy the firebase configuration. Store that in a file `config.js`. Values should be on environment variables. Create a new storage reference using `getStorage` and export that.

   ```javascript
   import { initializeApp } from 'firebase/app'
   import { getStorage } from 'firebase/storage'

   // Your web app's Firebase configuration
   const firebaseConfig = {
   	apiKey: 'AIzaSyCFZ6457rjJOFKLpd7b2HDSsc9hs1CUlVE',
   	authDomain: 'firestorage-yt.firebaseapp.com',
   	projectId: 'firestorage-yt',
   	storageBucket: 'firestorage-yt.appspot.com',
   	messagingSenderId: '372871883935',
   	appId: '1:372871883935:web:bd07a58b0ff9c5ea5586aa',
   }

   // Initialize Firebase
   const app = initializeApp(firebaseConfig)

   const storage = getStorage(app)

   export { storage }
   ```

3. Install the firebase package on Nextjs project.
4. Create storage from the console and use the test mode

## Upload Images or files

```javascript
import { useRef } from 'react'
import { ref, uploadBytes } from 'firebase/storage'
import { storage } from './config'

const Uploader = () => {
	const inputRef = useRef(null)

	const handleUpload = async e => {
		e.preventDefault()

		const file = inputRef.current.files[0]

		try {
			const fileRef = ref(storage, `images/${file.name}`)
			await uploadBytes(fileRef, file)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div>
			<form onSubmit={handleUpload}>
				<input ref={inputRef} type='file' name='file' />
				<button type='submit'>Upload</button>
			</form>
		</div>
	)
}
```

**Explanation:**

1. Created a new form with an input field of type 'file'. Without the input field, we can't select the file from the local system.
2. Pass a `ref` to the input field so that we can access the file.
3. We get the file from `inputRef.current.files[0]`. The return should be an File object.
4. Create a reference to the file in the cloud storage using `ref`.
5. Use `uploadBytes` to upload the file to the cloud storage. There are many different format you can use for uploading. Like File, Blob, Uint8Array, etc. Check the [docs](https://firebase.google.com/docs/storage/web/upload-files?hl=en#upload_files)

This is how you can upload images or files on Firebase Cloud Storage with Nextjs 14.
To learn how to display upload progress, state or how to pause and resume the upload, check the video tutorial.

## Shameless Plug

I also have [ firebase firestore series ](https://www.youtube.com/playlist?list=PLEr-WXao6eSPsNP0_Pk4X-3jdcoTWFutb) on my youtube channel. If you are interested, you can check that out.

{% youtube PoTUX9_3LaQ %}

If the blog has been helpful, please consider subscribe to my [ channel ](https://www.youtube.com/channel/UCBaGowNYTUsm3IDaHbLRMYw/) and drop a 💖. It will help me a lot.
