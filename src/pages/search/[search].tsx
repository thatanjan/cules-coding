import React from 'react'
import { GetServerSideProps } from 'next'

import BlogModel from 'mongoose/Blog'
import connectDB from 'mongoose/connectDB'

import { Blog } from 'interfaces/Blog'

interface Props {
	blogs: Blog[]
	searchedItem: string
}

const Search = ({ blogs, searchedItem }: Props) => {
	return <div></div>
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

	return {
		props: { blogs, searchedItem: search },
	}
}
