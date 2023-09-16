---
title: How to create modals and popups with Dialog tag in Html
description:
banner: /blogs/html/how-to-create-modals-and-popups-with-dialog-tag-in-html/banner.png
altText: How to create modals and popups with Dialog tag in Html from Cules Coding by @thatanjan
customID: 3D6kXi5d-qBEFnnxbJszM
---

In this post, how to build modals or popups with the dialog tag in html very easily.

### Basic Structure

Here's the basic structure of the dialog element:

```html
<dialog>
	<!-- Content of the dialog goes here -->
</dialog>
```

### Basic example

```html
<h1>Some content</h1>

<button id="open-button">Open My Modal</button>

<dialog id="modal">
	<div class="modal-content">
		<h2>Modal Title</h2>
		<p>This is the content of the modal.</p>
		<button id="close-button">Close</button>
	</div>
</dialog>

<h1>Some more content</h1>
```

```javascript
// Seletcing the elements
const modal = document.getElementById('modal')
const openButton = document.getElementById('open-button')
const closeButton = document.getElementById('close-button')

openButton.addEventListener('click', () => {
	modal.showModal()
})

closeButton.addEventListener('click', () => {
	modal.close()
})
```

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0aj0rjgl1elwp6t07b7k.png)

This what it looks like by default.

#### Explanation

1. In html, One button for opening the modal.
2. Some basic content inside that dialog tag including a close button
3. In js, we need to select 3 elements:
   - modal
   - open button
   - close button
4. We added the click eventlisteners to the buttons.
5. To open the button just use the `showModal` method from the modal object
6. And `close` method for closing the modal.

### As popup

Whee you use the `showModal` method you can not interact with the background.
