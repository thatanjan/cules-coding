import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'

import getFiles from 'utils/getFiles'

import connectDB from 'mongoose/connectDB'
import BlogModel from 'mongoose/Blog'

import { Blog } from 'interfaces/Blog'

import MasonaryBlogs from 'components/Layout/MasonaryBlogs'

interface Props {
	category: string
	blogs: Array<Blog>
}

const category = ({ category, blogs }: Props) => {
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
	const categories = getFiles('')

	const paths = categories.map(category => ({
		params: { category },
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

export default category
