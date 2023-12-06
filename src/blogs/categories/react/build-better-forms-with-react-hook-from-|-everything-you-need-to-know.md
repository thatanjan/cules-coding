---
title: Build better forms with React hook form | Everything you need to know
description:
banner: /blogs/react/build-better-forms-with-react-hook-from-|-everything-you-need-to-know/banner.png
altText:
customID: MTnshMgjZCUpi-Rl1gtJS
---

In this article, we will learn how to build better and more performant forms with the React hook form.

We will learn:

- Controlled vs Uncontrolled inputs
- Why React hook form?
- Basic usage
- Form validation
- Form Context

You can also watch the crash course where I have explained everything in detail.

<Iframe videoID='ntbEkJQUyPA' />

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
4. Validation out of the box or integration with Yup, Joi, etc.

## Starter code

Use the repo to follow along. [repo](https://github.com/thatanjan/react-hook-form-yt)
Or you can install the `react-hook-form` package in your project.
Also, I am going to use Chakra UI for styling. You can use any UI library or your custom styles.

## Basic usage

Go to the `Myform` component file and you should see a basic form.

<!-- NOTE: Need to add an image of the form -->

### Registering inputs

This library works by registering inputs to the form using a hook called `useForm`

```javascript
import { useForm } from 'react-hook-form'

const { register } = useForm()
```

The `register` function is used to register the input to the form. And we need to call it to all the input and spread the return object. The first argument has to be

```javascript
<Input id='name' placeholder='Name' {...register('name')} />
```

### Submitting the form

To submit the form, we need to call the `handleSubmit` function from the `useForm` hook.

```javascript
const {
	handleSubmit,
	formState: { isSubmitting }, // A state for displaying loading indicator
} = useForm()

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// submit handler
const onSubmit = async data => {
	await sleep(2000)
	if (data) {
		alert(JSON.stringify(data))
	} else {
		alert('There is an error')
	}
}

const MyForm = () => {
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{/* form inputs */}
			{/* more form inputs */}
			<Button type='submit' isLoading={isSubmitting}>
				Submit
			</Button>
		</form>
	)
}
```

**Explanation**:

1. We are using the `sleep` function to simulate an API call.
2. The `handleSubmit` function takes a callback function as an argument. This callback function will be called when the form is submitted.
3. The `handleSubmit` function will pass the form data to the callback function as an argument and we will display the data.

### Default values

You can add default values to the form using the `defaultValues` prop of the `useForm` hook.

```javascript
const { register } = useForm({
	defaultValues: {
		name: 'Jane',
		gender: 'female',
		email: 'Jane@gmail.om',
		password: '123456',
	},
})
```

### Getting form values

You can do it in two ways. Using the watch function or using the `getValues` function.

```javascript
const { watch, getValues } = useForm()

watch('name') // watch a single input
watch(['name', 'email']) // watch multiple inputs
watch() // watch all inputs

getValues('name') // watch a single input
getValues(['name', 'email']) // watch multiple inputs
getValues() // watch all inputs
```

**Explanation**:

1. The `watch` function will cause a rerender of the component where it is called whenever the value of the input changes. Similar to the react state. Use the `useWatch` hook for reducing rerenders.
2. The `getValues` function will return the value of the input. It will not cause a rerender. You want to use this inside an event handler like `onClick`.

You can also add onChange handlers to inputs.

```javascript
const { register } = useForm()

<Input
	id='name'
	placeholder='Name'
	{...register('name', {
		onChange: e => console.log(e.target.value),
	})}
/>
```

### Form validation

You can validate the form using the `register` function as a second parameter.

```javascript
const Myform = () => {
	const { register, errors } = useForm()
	return (
		<form>
			<FormControl isInvalid={errors.name}>
				<FormLabel htmlFor='name'>Name</FormLabel>
				<Input
					id='name'
					placeholder='Name'
					{...register('name', {
						required: 'This field is required',
						minLength: {
							value: 10,
							message: 'Minimum length should be 10',
						},
					})}
				/>
				<FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={errors.gender}>
				<FormLabel htmlFor='gender'>Gender</FormLabel>
				<Select
					placeholder='Gender'
					{...register('gender', { required: 'This field is required' })}
				>
					<option value='male'>Male</option>
					<option value='female'>Female</option>
				</Select>
				<FormErrorMessage>
					{errors.gender && errors.gender.message}
				</FormErrorMessage>
			</FormControl>
		</form>
	)
}
```

**Explanation**:

1. The `errors` object will contain all the errors of the form. You can use it to display the error message.
2. The `isInvalid` prop of the `FormControl` component will display the error message if the input is invalid. Only needed if you use Chakra UI.

Learn more about validation from [here](https://react-hook-form.com/docs/useform/register#registerRef).

### Form State

You can get the form state using the `formState` object coming from `useform`.

```javascript
const { formState } = useForm()
```

Some of the useful Properties:

- `isDirty`
- `isSubmitSuccessful`
- `isSubmitting`
- `isValid`
- `errors`
- `dirtyFields`

Learn more about form state from [here](https://react-hook-form.com/docs/useform/formstate).

### Form Context

You can create a form context which is a global state using the `useFormContext` hook.
This can be useful when you have nested forms or you are trying to build multi-step forms.

- **Wrapper component**

```javascript
const App = () => {
	const formMethods = useForm({
		defaultValues: {
			companyName: 'Google',
		},
	})

	return (
		<FormProvider {...formMethods}>
			<MyFormWithContext />
			<MyForm />
		</FormProvider>
	)
}
```

- **Child component**

```javascript
	const {
		handleSubmit,
		formState: { errors, isSubmitting, isValid },
		register,
	} = useFormContext()

	const Form () => {
	    // components
	}
```

**Explanation**:

- We are using the `FormProvider` component to wrap the form components and spread the return object of the `useForm` hook.
- We are using the `useFormContext` hook to get the form context in the child component. It will return the same object as the `useForm` hook.
- The process is very similar to react context.

Learn more about form context from [here](https://react-hook-form.com/docs/useformcontext).

To learn more about this, I would recommend checking my crash course.
