import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'
import matter from 'gray-matter'

import getFiles from 'utils/getFiles'
import readFilesBySlug from 'utils/readFilesBySlug'

import BlogHeaderMedia from 'components/Blog/BlogHeaderMedia'
import BlogHeader from 'components/Blog/BlogHeader'
import BlogNavigation from 'components/Blog/BlogNavigation'
import MDXComponents from 'components/Blog/MDXComponents'

import connectDB from 'mongoose/connectDB'
import BlogModel from 'mongoose/Blog'

import { UpdateDB } from 'interfaces/ApiRoutes'
import MatterData from 'interfaces/MatterData'

interface Props {
	mdxSource: MdxRemote.Source
	metaData: MatterData
	title: string
	catagory: string
	createdAt: string
}

const Blog = ({
	mdxSource,
	metaData: { description, banner, altText },
	title,
	catagory,
	createdAt,
}: Props) => {
	const content = hydrate(mdxSource, {
		components: {
			...MDXComponents,
		},
	})

	return (
		<div className='s-content content'>
			<main className='row content__page'>
				<article className='column large-full entry format-standard'>
					<BlogHeaderMedia imagePath={banner} altText={altText} />

					<BlogHeader {...{ title, createdAt, catagory }} />

					<p className='lead'>{description}</p>

					{content}

					<BlogNavigation prevPost='yes react' />
				</article>
			</main>
		</div>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const catagories = getFiles('')

	let allFileNames: String[] = []

	catagories.forEach(catagory => {
		const files = getFiles(catagory)

		allFileNames = allFileNames.concat(files)
	})

	let fileNamesWithOutExtention = allFileNames.map(fileName =>
		fileName.replace('.mdx', '')
	)

	const paths = fileNamesWithOutExtention.map(file => {
		return {
			params: { slug: file },
		}
	})

	return {
		paths,
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
	const theSlug: string = slug as string

	const catagories = getFiles('')

	const slugFileName = `${theSlug}.mdx`

	let slugCatagoryIndex = catagories.findIndex(catagory => {
		const catagoryFiles = getFiles(catagory)

		return catagoryFiles.includes(slugFileName)
	})

	const slugCatagory = catagories[slugCatagoryIndex]

	const fileContent = readFilesBySlug(slugCatagory, theSlug)

	const { data: metaData, content } = matter(fileContent)

	const mdxSource = await renderToString(content, {
		components: MDXComponents,
	})

	await connectDB()

	const { description } = metaData

	const title = theSlug.replace('-', ' ')

	const updateData: UpdateDB = {
		content,
		slug: theSlug as string,
		title,
		description,
		catagory: slugCatagory,
	}

	const { createdAt } = await BlogModel.findOneAndUpdate(
		{ title },
		{ $set: updateData },
		{
			new: true,
			upsert: true,
			setDefaultsOnInsert: true,
			projection: 'createdAt',
		}
	)

	return {
		props: {
			mdxSource,
			metaData,
			title,
			catagory: slugCatagory,
			createdAt: createdAt.toDateString(),
		},
	}
}

export default Blog
