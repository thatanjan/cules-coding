import React from 'react'
import { GetStaticProps } from 'next'

import connectDB from 'mongoose/connectDB'
import CategoryModel from 'mongoose/Category'

import MasnoryCategories, { Props } from 'components/Layout/MasnoryCategories'

const Category = ({ categories }: Props) => {
	return (
		<>
			<MasnoryCategories {...{ categories }} />
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	await connectDB()

	const result = await CategoryModel.find({}, { _id: 0, __v: 0 })

	const categories = result.map(res => res.toObject())

	return {
		props: { categories },
	}
}

export default Category
