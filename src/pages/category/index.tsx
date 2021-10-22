import { NextSeo } from 'next-seo'
import React from 'react'
import { GetStaticProps } from 'next'

import connectDB from 'mongoose/connectDB'
import CategoryModel from 'mongoose/Category'

import MasnoryCategories, { Props } from 'components/Layout/MasnoryCategories'

const Category = ({ categories }: Props) => {
	const title = 'Cules Coding'

	const description =
		'Cules coding is blogging site. People can read about programming, data structure, algorithms and many more'

	const seoImages = categories.map(({ banner, altText }) => ({
		url: banner,
		alt: altText,
		width: 1920,
		height: 1080,
		type: 'image/png',
	}))

	seoImages.push({
		url: '/cules-coding-banner.jpg',
		alt: description,
		width: 1920,
		height: 1080,
		type: 'image/png',
	})

	return (
		<>
			<NextSeo
				{...{ title: `Category | ${title}`, description }}
				openGraph={{
					title,
					description,
					images: seoImages,
					type: 'Blogging Website',
				}}
			/>

			<MasnoryCategories {...{ categories }} />
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	await connectDB()

	const result = await CategoryModel.find({}, { _id: 0, __v: 0 })

	const categories = result.map(res => res.toObject())

	return {
		props: { categories },
	}
}

export default Category
