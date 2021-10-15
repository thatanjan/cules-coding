import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'

import connectDB from 'mongoose/connectDB'
import BlogModel from 'mongoose/Blog'
import CategoryModel from 'mongoose/Category'

import { Blog } from 'interfaces/Blog'

import MasonaryBlogs from 'components/Layout/MasonaryBlogs'

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
	return (
		<>
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
		'title description -_id'
	)

	const response = await BlogModel.find(
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

	const props: Props = { blogs, categoryData: categoryData.toObject() }

	return {
		props,
	}
}

export default CategoryPage
