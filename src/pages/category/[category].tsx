import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'

import getFiles from 'utils/getFiles'
import { readAllFrontMatters } from 'utils/readFilesBySlug'

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
	const allMatters = readAllFrontMatters(category)

	await connectDB()

	const updateDB = allMatters.map(({ description, title }) => {
		const updateData = {
			slug: title.replace(' ', '-'),
			title,
			description,
			category,
		}

		return BlogModel.findOneAndUpdate(
			{ title },
			{ $set: updateData },
			{
				new: true,
				upsert: true,
				setDefaultsOnInsert: true,
				projection: 'createdAt slug',
			}
		)
	})

	const updateDBResult = await Promise.all(updateDB)

	const blogs: Blog[] = allMatters.map((matter, index) => ({
		...matter,
		createdAt: updateDBResult[index].createdAt.toDateString(),
		slug: updateDBResult[index].slug,
		category: category,
	}))

	const props: Props = { blogs, category }

	return {
		props,
	}
}

export default category
