import { NextSeo } from 'next-seo'
import React from 'react'
import { GetServerSideProps } from 'next'

import MasonaryBlogs from 'components/Layout/MasonaryBlogs'

import BlogModel from 'mongoose/Blog'
import connectDB from 'mongoose/connectDB'

import { Blog } from 'interfaces/Blog'

import { APP_NAME } from 'variables/global'

interface Props {
	blogs: Blog[]
	searchedItem: string
}

const Search = ({ blogs, searchedItem }: Props) => {
	const title = `${searchedItem} | ${APP_NAME}`
	return (
		<>
			<NextSeo
				{...{ title }}
				openGraph={{
					title,
					images: [
						{
							url: '/cules-coding-banner.jpg',
						},
					],
				}}
			/>
			<header className='listing-header'>
				<h1 className='h2' style={{ textTransform: 'none' }}>
					You have {blogs.length} search result based on "{searchedItem}"
				</h1>
			</header>

			<MasonaryBlogs {...{ blogs }} />
		</>
	)
}

export default Search

export const getServerSideProps: GetServerSideProps = async ({
	query: { search },
}) => {
	await connectDB()

	const project = {
		_id: 0,
		__v: 0,
		content: 0,
	}

	const result = await BlogModel.find(
		{
			$text: {
				$search: search as string,
			},
		},
		project
	).sort({ score: { $meta: 'textScore' } })

	const blogs = result.map(blog => {
		blog = blog.toObject()
		blog.createdAt = blog.createdAt.toDateString()

		return blog
	})

	console.log(blogs)

	return {
		props: { blogs, searchedItem: search },
	}
}
