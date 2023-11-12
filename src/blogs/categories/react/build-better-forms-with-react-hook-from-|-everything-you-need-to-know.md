---
title: Build better forms with React hook from | Everything you need to know
description:
banner: /blogs//build-better-forms-with-react-hook-from-|-everything-you-need-to-know/banner.png
altText:
customID: MTnshMgjZCUpi-Rl1gtJS
---

In this article, we will learn how to build better and performant forms with React hook form.

We will learn:

- Controlled vs Uncontrolled inputs
- Why React hook form?
- Basic usage
- Form validation
<!-- - NOTE: Need to add more points. -->

## Controlled vs Uncontrolled inputs

A controlled input is an input whose value is controlled by React. In other words, the value of the input is stored in the state of the component and is updated via the `onChange` handler.

```javascript
import React, { useState } from 'react'

function ControlledInput() {
	const [inputValue, setInputValue] = useState('')

	const handleInputChange = event => {
		setInputValue(event.target.value)
	}

	return <input type='text' value={inputValue} onChange={handleInputChange} />
}
```

On the other hand, an uncontrolled input is an input whose value is not controlled by React. In other words, the value of the input is stored in the DOM and is updated via the `ref` attribute.

```javascript
import React, { useRef } from 'react'

function UncontrolledInput() {
	const inputRef = useRef()

	const handleButtonClick = () => {
		alert(`Input value: ${inputRef.current.value}`)
	}

	return (
		<div>
			<input type='text' ref={inputRef} />
			<button onClick={handleButtonClick}>Get Value</button>
		</div>
	)
}
```

React state rerender the component whenever the state changes. So, if we have a form with many inputs, then it will rerender the component whenever the user types something in the input field. This will cause performance issues.
But, with uncontrolled inputs, we can avoid this issue because ref doesn't cause the component to rerender.

## Why React hook form?

1. Performance(because of uncontrolled inputs)
2. Easy to use
3. Easy to integrate with UI libraries like Material UI, Chakra UI, etc.
4. Validaton out of the box or integrate with Yup, Joi, etc.

## Starter code

Use the repo to follow along. [repo](https://github.com/thatanjan/react-hook-form-yt)
Or you can install the `react-hook-form` package in your project.
Also I am going to use Chakra UI for styling. You can use any UI library or your own custom styles.

## Basic usage

Go to `Myform` component file and you should see a basic form.

<!-- NOTE: Need to add image of the form -->

This library works by registering inputs to the form using a hook called `useForm`
