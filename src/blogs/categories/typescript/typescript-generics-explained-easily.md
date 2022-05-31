---
title: Typescript Generics explained easily
description:
banner: /blogs/typescript/typescript-generics-explained-easily/banner.png
altText: Typescript Generics explained easily in Cules Coding by @thatanjan
customID: jsyGg35hnN_d9a4lrdIom
---

In this article, I will explain the basics of generics in typescript.

Generics in typescript can be confusing but it is very easy. It is a great and useful feature. I will explain it as simply as possible.

## Video Tutorial

<Iframe videoID='ewOnjLgKWOs' />

## What is Generics?

Let me give you a simple example:

```typescript
const printNum = (num: number) => {
	console.log(num)
}

printNum(12)
printNum(92)
printNum(2)

// result
// 12
// 92
// 2
```

This function takes a number as a parameter and prints it on the console. The num parameter can be anything. We don't know. Whenever you call the function with an argument, the `num` parameter becomes that argument value.

Typescript generics is kinda like that. But instead of expecting values as parameters, we expect types. And we pass types as arguments. I think typescript generics name is kinda misleading. This name makes it look complex. But it is not. It should be called type parameter or something like that.

Let's see how it works:

```typescript
const createNewUser = (user: object) => {
	const newUser = { ...user, active: true, power: 100 }

	return newUser
}

const user = createNewUser({ name: 'John Doe', age: 21 })

console.log(user)
console.log(user.name) // error: Property 'name' does not exist on type '{ active: boolean; power: number; }'.
```

This function takes a user parameter which has to be an object. We are creating a new user object with the properties of the user object and adding the active and power properties. The new user object is returned.

We are creating a new user with that function passing a user object as an argument. Finally, we are printing the user object.

We don't have any errors. But if we try to access the `name` for `age` property, we will get an error like this:

```
Property 'name' does not exist on type '{ active: boolean; power: number; }'.
```

![download](https://user-images.githubusercontent.com/71136371/171092664-1c29c0cd-d143-4f6d-8298-ea5907834072.jpg)

Because the `user` parameter has object type but we didn't specify any properties and their type. So the compiler didn't know what types to include.

We can fix this by specifying an interface:

```typescript
interface User {
	name: string
	age: number
}

const createNewUser = (user: User) => {
	const newUser = { ...user, active: true, power: 100 }

	return newUser
}

const user = createNewUser({ name: 'John Doe', age: 21 })

console.log(user)
console.log(user.name) // works fine
```

![image](https://user-images.githubusercontent.com/71136371/171093263-0e9af932-5d1d-493f-9938-988c4ba7b806.png)

But different users might need different properties. So, if you use a single interface then you can't use it for different users.

This is where Typescript generics come into play. We can expect a type parameter for the function. And also we will be able to pass the type when we will call the function.

```typescript
const createNewUser = <T>(user: T) => {
	const newUser = { ...user, active: true, power: 100 }

	return newUser
}

const user = createNewUser({ name: 'John Doe', age: 21 })

console.log(user)
console.log(user.name) // works fine
```

We add type parameters(generics) to the function by adding `<>` after the function name. Then you can specify your type parameter name. You can call it whatever you want but most people use `T` for simplicity.

Then we have specified the user as type `T`. Now whatever argument you will pass in the function call, `user` will be of that type. You can pass whatever type you want. But if you want `T` to be a specific type, then you can extend that type.

```typescript
const createNewUser = <T extends object>(user: T) => {
	const newUser = { ...user, active: true, power: 100 }

	return newUser
}

const user = createNewUser({ name: 'John Doe', age: 21 })

console.log(user)
console.log(user.name) // works fine
```

Now you always have to pass an object.
You can also pass types in the function call. What if you always want to pass some interface?

```typescript
const createNewUser = <T>(user: T) => {
	const newUser = { ...user, active: true, power: 100 }

	return newUser
}

interface User {
	name: string
	age: number
}

const user = createNewUser<User>({ name: 'John Doe', age: 21 })

interface User2 extends User {
	country: string
}

const user2 = createNewUser<User2>({
	name: 'John Doe',
	age: 21,
	country: 'BD',
})
```

This time, we are creating two user interfaces and we are passing the user interface as an argument.
And those two user object will be their interface type.

I hope everything is clear to you now. If not, let me give you another example.

```typescript
interface User<T> {
	name: string
	age: number
	extraInfo: T
}
```

We have this `User` interface and `extraInfo` property can be any type. We just don't know. But don't pass `any` type.

![image](https://user-images.githubusercontent.com/71136371/171095937-9932908d-98d4-4c3d-a2a3-18f54d0713ea.png)

So that's why we are using generics.

```typescript
interface User<T> {
	name: string
	age: number
	extraInfo: T
}

interface Address {
	city: string
	country: string
}

const user: User<Address> = {
	name: 'Anjan',
	age: 20,
	extraInfo: {
		city: 'Dhaka',
		country: 'BD',
	},
}
```

Now `extraInfo` is of type `Address`.

## Multiple types in the generics.

```typescript
interface User<T, A> {
	name: string
	age: A
	extraInfo: T
}

const user: User<Address, number> = {
	name: 'Anjan',
	age: 20,
	extraInfo: {
		city: 'Dhaka',
		country: 'BD',
	},
}
```

## Default types

```typescript
interface User<T, A = number> {
	name: string
	age: A
	extraInfo: T
}

const user: User<Address> = {
	name: 'Anjan',
	age: 20,
	extraInfo: {
		city: 'Dhaka',
		country: 'BD',
	},
}
```
