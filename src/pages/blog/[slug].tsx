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
	await connectDB()

	const blog = await BlogModel.findOne({ slug })

	const { category } = blog

	const { _id: _, __v: __, content, createdAt, ...neededData } = blog.toObject()

	const pureContent = content.replace('\n', '')

	const mdxSource = await renderToString(pureContent, {
		components: MDXComponents,
	})

	const allPostOfCategory = await BlogModel.find(
		{ category },
		'title slug'
	).sort({
		createdAt: -1,
	})

	const currentBlogIndex = allPostOfCategory.findIndex(
		post => post.slug === slug
	)

	const nextPost = allPostOfCategory[currentBlogIndex + 1]?.title || ''
	const prevPost = allPostOfCategory[currentBlogIndex - 1]?.title || ''

	console.log(neededData)

	return {
		props: {
			...neededData,
			mdxSource,
			prevPost,
			nextPost,
			createdAt: createdAt.toDateString(),
		},
	}
}

export default Blog
