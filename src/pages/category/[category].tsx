import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'

import getFiles from 'utils/getFiles'
import { readAllFrontMatters } from 'utils/readFilesBySlug'

import connectDB from 'mongoose/connectDB'
import BlogModel from 'mongoose/Blog'

interface Props {
	category: string
}

const category = ({ category }: Props) => {
	return <>{category}</>
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
}) => {
	const allMatters = readAllFrontMatters(category as string)

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
				projection: 'createdAt',
			}
		)
	})

	const updateDBResult = await Promise.all(updateDB)

	const data = allMatters.map((matter, index) => ({
		...matter,
		createdAt: updateDBResult[index].createdAt.toDateString(),
	}))

	return {
		props: { ...data, category },
	}
}

export default category
