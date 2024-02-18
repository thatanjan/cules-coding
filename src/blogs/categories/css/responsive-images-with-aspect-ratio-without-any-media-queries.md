---
title: Responsive images with aspect ratio without any media queries
description:
banner: /blogs/css/responsive-images-with-aspect-ratio-without-any-media-queries/banner.png
altText:
customID: LHMAIFSWITv2JkUZVuW2s
---

In this article, we will learn how to create responsive images with aspect ratio without using any media queries.

## Video tutorial

If you prefer video, I have a video tutorial for you. You can watch it below.

<Iframe videoID="YYxfwDWuPmc" />

## Codepen

I would suggest you to play with the codepen below to understand the concept better.
<Codepen id="mdBLjgK" title='Responsive images with aspect ratio without any media queries' />

## What is Image aspect ratio?

Image aspect ratio is the proportional relationship between the width and height of an image. It is commonly expressed as two numbers separated by a colon, as in 16:9. For an x:y aspect ratio, no matter how big or small the image is, if the width is divided into x units of equal length and the height is measured using this same length unit, the height will be measured to be y units.
If you keep the aspect ratio of an image, it will not be distorted when resized.

## How to create responsive images with aspect ratio?

```html
<div class="outer__container">
	<div class="container">
		<img
			class="image"
			src="https://wallpapercave.com/wp/wp2042899.jpg"
			alt="Taylor swift image tutorial by Cules Coding"
			srcset=""
		/>
	</div>

	<h1>Taylor Alison Swift</h1>
</div>
```

We have an outer container and a container and an image inside the container.

```css
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
	min-height: 100vh;
	display: grid;
	place-items: center;
}

.outer__container {
	width: 80%;
	padding: 0 20px;
}

.container {
	width: 100%;
	position: relative;
	padding-top: 56.25%; // 16:9 aspect ratio
}

.image {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
}

h1 {
	font-size: 3rem;
	font-family: monospace;
	text-align: center;
}
```

Explanation:

1. We have added a width to the outer container
2. The container will be positioned relative and the image will be positioned absolute.
3. Image will be 100% width and 100% height of the container.
4. The idea is to keep the aspect ratio of the container and the image will take the height and width of the container.
5. We add the aspect ratio to the container using padding-top. We have used 56.25% which is the aspect ratio of 16:9. You can calculate the aspect ratio using the formula (height/width) * 100. For instance, to keep the image square you will use 100%. `( 1000px/1000px ) * 100`
   Now if you resize the image it will keep the aspect ratio and will not be distorted.

## Css aspect ratio property

You can use css aspect-ratio property to keep the aspect ratio of the image. It is a new property and is not supported in all browsers. You can use it like this:

```css
.image {
	width: 100%;
	aspect-ratio: 16/9;
}
```

You don't have to use any positioning or padding to keep the aspect ratio of the image like the previous example.

This is how you can create responsive images with aspect ratio without using any media queries. If you have any questions, feel free to ask in the comments section below.
