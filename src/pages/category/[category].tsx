import { NextSeo } from 'next-seo'
import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'

import connectDB from 'mongoose/connectDB'
import BlogModel from 'mongoose/Blog'
import CategoryModel from 'mongoose/Category'

import { Blog } from 'interfaces/Blog'

import MasonaryBlogs from 'components/Layout/MasonaryBlogs'

import { APP_NAME } from 'variables/global'

interface Props {
	categoryData: {
		title: string
		description: string
	}
	blogs: Array<Blog>
}

const CategoryPage = ({
	categoryData: { title, description },
	blogs,
}: Props) => {
	let maxViews = 0
	let maxIndex = 0

	blogs.forEach((blog, index) => {
		if (maxViews < blog.totalViews) {
			maxViews = blog.totalViews
			maxIndex = index
		}
	})

	const pageTitle = `${title} | ${APP_NAME}`

	return (
		<>
			<NextSeo
				{...{ title: pageTitle, description }}
				openGraph={{
					title: pageTitle,
					description,
					images: [
						{
							url: blogs[maxIndex].banner,
							alt: blogs[maxIndex].description,
							height: 1080,
							width: 1920,
						},
					],
				}}
			/>

			<header className='listing-header'>
				<h1 className='h2'>{title}</h1>
				<p>{description}</p>
			</header>

			<MasonaryBlogs {...{ blogs }} />
		</>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	await connectDB()

	const categories = await CategoryModel.find({}, 'slug')

	const paths = categories.map(({ slug }) => ({
		params: { category: slug },
	}))

	return {
		paths,
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps = async ({
	params: { category },
}: {
	params: { category: string }
}) => {
	await connectDB()

	const categoryData = await CategoryModel.findOne(
		{ slug: category },
		'title description -_id',
	)

	const response = await BlogModel.find(
		{ category },
		{ _id: 0, __v: 0, content: 0 },
	).sort({
		createdAt: -1,
	})

	const blogs: Blog[] = response.map(blog => {
		const blogObject = blog.toObject()
		blogObject.createdAt = blogObject.createdAt.toDateString()

		return blogObject
	})

	const props: Props = { blogs, categoryData: categoryData.toObject() }

	return {
		props,
	}
}

export default CategoryPage
