import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'

import getFiles from 'utils/getFiles'
import { readAllFrontMatters } from 'utils/readFilesBySlug'

import connectDB from 'mongoose/connectDB'

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

	return {
		props: { ...allMatters, catagory },
	}
}

export default Catagory
