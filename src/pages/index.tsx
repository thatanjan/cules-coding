import { GetStaticProps } from 'next'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

import connectDB from 'mongoose/connectDB'

import BlogModel from 'mongoose/Blog'
import CategoryModel from 'mongoose/Category'
import getFiles from 'utils/getFiles'
import readFilesBySlug from 'utils/readFilesBySlug'

const Home = ({ slugs }: any) => {
	return (
		<>
			<div className='s-content'>hello</div>

			{slugs.map((slug: any) => (
				<h1 key={slug}>{slug}</h1>
			))}
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	await connectDB()

	// categories

	const root = process.cwd()
	const files = getFiles('../eachCategory')

	const fileDatas = files.map(fileName =>
		fs.readFileSync(path.join(root, 'src/blogs/eachCategory', fileName))
	)

	const matters = fileDatas
		.map(fileData => matter(fileData).data)
		.map((matter, index) => ({
			...matter,
			title: files[index].replace('.mdx', '').replace('-', ' '),
			slug: '/category/' + files[index].replace('.mdx', ''),
		}))

	const updateCategories = matters.map(matter =>
		CategoryModel.updateOne(
			{ title: matter.title },
			{ $set: matter },
			{
				upsert: true,
				setDefaultsOnInsert: true,
			}
		)
	)

	await Promise.all(updateCategories)

	// allFiles

	const readOneCategoryFiles = (category: string) => {
		const fileNames = getFiles(category)

		const fileDatas = fileNames.map(fileName =>
			readFilesBySlug(category, fileName)
		)

		const matterDatas = fileDatas.map(fileData => matter(fileData))

		const returnObject = matterDatas.map(({ content, data }, index) => {
			const slug = fileNames[index].replace('.mdx', '')

			return {
				content,
				...data,
				title: slug.replace('-', ' '),
				category,
				slug,
			}
		})

		return returnObject
	}

	const categories = getFiles('')

	let data = []

	categories.forEach(category => {
		data = data.concat(readOneCategoryFiles(category))
	})

	const promises = data.map(blog => {
		return BlogModel.updateOne(
			{ title: blog.title },
			{ $set: blog },
			{
				upsert: true,
				setDefaultsOnInsert: true,
			}
		)
	})

	await Promise.all(promises)

	return {
		props: { slugs: [] },
	}
}

export default Home
