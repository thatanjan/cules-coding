---
title: How to create modals and popups with Dialog tag in Html
description:
banner: /blogs/html/how-to-create-modals-and-popups-with-dialog-tag-in-html/banner.png
altText: How to create modals and popups with Dialog tag in Html from Cules Coding by @thatanjan
customID: 3D6kXi5d-qBEFnnxbJszM
---

In this article, we will learn how to create modals and popups with Dialog tag in Html.

I have already created a video on this topic. You can watch it here:

<Iframe videoID="MwOaVAVrTq4" />

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

When you use the `showModal` method you can not interact with the background.
But if you use the show method then it will open as a popup and you will be able to interact with background.

```javascript
openButton.addEventListener('click', () => {
	modal.show()
})
```

### Dialog tag with form

You get exta features when you use forms inside dialog

```html
<dialog id="modal">
	<form method="dialog">
		<input type="text" name="" value="" />
		<button type="submit">Submit</button>
		<button type="submit">Cancel</button>
	</form>
</dialog>
```

Suppose you want to close the modal without submitting the form. Plus you want to store the user input.
You can do that with JS but dialog tag already have that built in feature. Just use `method="dialog"` on `form`.

But that can create a problem. You won't be able to submit the form. It always just close the modal.

To fix that just remove that attribute from `form`.

```html
<dialog id="modal">
	<form>
		<input type="text" name="" value="" />
		<button type="submit">Submit</button>
		<button type="submit" formmethod="dialog">Cancel</button>
	</form>
</dialog>
```

Use `formmethod='dialog'` on the close button of the modal. In this way, The close button will just close the modal but other submit button will submit the form and close the modal.

Watch the video for better understanding.

### How to style?

Dialog tag can be styled as any other element. It also comes with a backdrop as pseduo element. Here is a simple example of making the backdrop blur.

```css
#modal {
	width: 500px;
	border: none;
}

#modal::backdrop {
	background: rgba(0, 0, 0, 0.5);
	filter: blur(2rem);
}
```
