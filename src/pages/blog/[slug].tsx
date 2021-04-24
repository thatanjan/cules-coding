import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'
import matter from 'gray-matter'

import getFiles, { getFilesByDate } from 'utils/getFiles'
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
	category: string
	createdAt: string
	prevPost: string
	nextPost: string
}

const Blog = ({
	mdxSource,
	metaData: { description, banner, altText },
	title,
	category,
	createdAt,
	prevPost,
	nextPost,
}: Props) => {
	const content = hydrate(mdxSource, {
		components: {
			...MDXComponents,
		},
	})

	return (
		<main className='row content__page'>
			<article className='column large-full entry format-standard'>
				<BlogHeaderMedia imagePath={banner} altText={altText} />

				<BlogHeader {...{ title, createdAt, category }} />

				<p className='lead'>{description}</p>

				{content}

				<BlogNavigation {...{ prevPost, nextPost }} />
			</article>
		</main>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	await connectDB()

	const slugs = await BlogModel.find({}, 'slug')

	const paths = slugs.map(item => {
		return {
			params: { slug: item.slug },
		}
	})

	return {
		paths,
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
	const theSlug: string = slug as string

	const categories = getFiles('')

	const slugFileName = `${theSlug}.mdx`

	let slugCatagoryIndex = categories.findIndex(category => {
		const catagoryFiles = getFiles(category)
		return catagoryFiles.includes(slugFileName)
	})

	const slugCatagory = categories[slugCatagoryIndex]

	const slugCatagoryFiles = getFilesByDate(slugCatagory, 'descending')

	const slugFileIndex = slugCatagoryFiles.findIndex(
		value => value === slugFileName
	)

	const slugPreviousFile: string | undefined =
		slugCatagoryFiles[slugFileIndex - 1]

	const slugPreviousFileName: string = slugPreviousFile
		? slugPreviousFile.replace('-', ' ').replace('.mdx', '')
		: ''

	const slugNextFile: string | undefined = slugCatagoryFiles[slugFileIndex + 1]

	const slugNextFileName: string | undefined = slugNextFile
		? slugNextFile.replace('-', ' ').replace('.mdx', '')
		: ''

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
		category: slugCatagory,
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
			category: slugCatagory,
			createdAt: createdAt.toDateString(),
			prevPost: slugPreviousFileName,
			nextPost: slugNextFileName,
		},
	}
}

export default Blog
