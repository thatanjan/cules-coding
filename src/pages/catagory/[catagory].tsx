import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'

import getFiles from 'utils/getFiles'
import { readAllFrontMatters } from 'utils/readFilesBySlug'

import connectDB from 'mongoose/connectDB'
import BlogModel from 'mongoose/Blog'

interface Props {
	catagory: string
}

const Catagory = ({ catagory }: Props) => {
	return <>{catagory}</>
}

export const getStaticPaths: GetStaticPaths = async () => {
	const catagories = getFiles('')

	const paths = catagories.map(catagory => ({
		params: { catagory },
	}))

	return {
		paths,
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps = async ({
	params: { catagory },
}) => {
	const allMatters = readAllFrontMatters(catagory as string)

	await connectDB()

	const updateDB = allMatters.map(({ description, title }) => {
		const updateData = {
			slug: title.replace(' ', '-'),
			title,
			description,
			catagory,
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
		props: { ...data, catagory },
	}
}

export default Catagory
