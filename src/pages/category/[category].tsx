import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'

import getFiles from 'utils/getFiles'

import connectDB from 'mongoose/connectDB'
import BlogModel from 'mongoose/Blog'
import CategoryModel from 'mongoose/Category'

import { Blog } from 'interfaces/Blog'

import MasonaryBlogs from 'components/Layout/MasonaryBlogs'

interface Props {
	category: string
	blogs: Array<Blog>
}

const CategoryPage = ({ category, blogs }: Props) => {
	return (
		<>
			<header className='listing-header'>
				<h1 className='h2'>Category: {category}</h1>
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

	let response = await BlogModel.find(
		{ category },
		{ _id: 0, __v: 0, content: 0 }
	).sort({
		createdAt: -1,
	})

	const blogs: Blog[] = response.map(blog => {
		blog = blog.toObject()
		blog.createdAt = blog.createdAt.toDateString()

		return blog
	})

	const props: Props = { blogs, category }

	return {
		props,
	}
}

export default CategoryPage
