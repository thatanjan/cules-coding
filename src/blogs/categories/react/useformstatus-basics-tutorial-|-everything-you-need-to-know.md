---
title: useFormStatus basics tutorial | Everything you need to know
description:
banner: /blogs/react/useformstatus-basics-tutorial-|-everything-you-need-to-know/banner.png
altText:
customID: WruMyftwjwbFmX44SEbIA
---

In this tutorial, we will learn about the basics of useFormStatus. We will cover everything you need to know about `useFormStatus`. Let's get started.

## Video

<Iframe videoID='https://youtu.be/MY936LImwMM?si=OEz6KLMLjKwA-wSy' />

## Why do we need useFormStatus?

When user submits a form and the form is being processed, it is a good practice to show a loading indicator to the user and disable the submit button. Previously you would create a separate state and manipulate the state inside submit handler. Similar to this:

```javascript
const Form = () => {
	const [loading, setLoading] = useState(false)

	const handleSubmit = async e => {
		e.preventDefault()
		setLoading(true)
		// ... your form submission logic
		setLoading(false)
	}

	return (
		<form onSubmit={handleSubmit}>
			<input type='text' name='name' />
			<button type='submit' disabled={loading}>
				Submit
			</button>
		</form>
	)
}
```

This is fine but it would have been nice if react could handle this logic for us.
And this is where `useFormStatus` comes in.

## How to use `useFormStatus`?

```javascript
// Form.jsx

const Form = () => {
	const handleSubmit = async data => {
		console.log(data.get('name')) // Prints the input value
		// ... your form submission logic
	}

	return (
		<form action={handleSubmit}>
			<input type='text' name='name' />
			<SubmitButton />
		</form>
	)
}
```

```javascript
// SubmitButton.jsx
import { useFormStatus } from 'react-dom'

const SubmitButton = () => {
	const { pending } = useFormStatus()

	return (
		<button type='submit' disabled={pending}>
			Submit
		</button>
	)
}
```

**Explanation**:

1. Like before we have a `handleSubmit` function but this time we passed in `action` prop.
2. `handleSubmit` takes a argument which is the `FormData`. You can get the input value using the `get` method.
3. We have a separate submit button. And we use the `useFormStatus` hook.
4. `useFormStatus` returns an object with a `pending` property. `pending` is `true` when the form is being submitted and `false` when the form submission is complete.

`useFormStatus` actually returns four things:

1. `pending`: `true` when the form is being submitted and `false` when the form submission is complete.
2. `action`: The `action` function passed to the form.
3. `data`: The `FormData` object.
4. `method`: The submit method. `GET` or `POST` etc.

`action`, `data` and `method` are null when the form is not being submitted.

So, this is how you can use `useFormStatus` to handle form submission status.

## Things to keep in mind

1. Form submission function should be passed to the form using the `action` prop.
2. The handler function has to be async or return a promise.
3. `useFormStatus` should be used inside a component that is a child of the form.

```javascript
// This will not work
const Form = () => {
	const { pending } = useFormStatus()
	return (
		<form>
			<input type='text' name='name' />
			<button type='submit' disabled={pending}>
				Submit
			</button>
		</form>
	)
}

// This will work
const Form = () => {
	return (
		<form>
			<input type='text' name='name' />
			<SubmitButton />
		</form>
	)
}

const SubmitButton = () => {
	const { pending } = useFormStatus()
	return (
		<button type='submit' disabled={pending}>
			Submit
		</button>
	)
}
```

That's it for this tutorial. I hope you find this tutorial helpful. If yes, please subscribe to my channel for more tutorials like this.
If you have any questions, feel free to ask in the comments below.
