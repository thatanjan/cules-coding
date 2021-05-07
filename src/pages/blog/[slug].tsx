import React, { useEffect } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'
import useSWR from 'swr'
import mainAxios from 'axios'
import { NextSeo } from 'next-seo'

import fetcher from 'utils/fetcher'
import axios from 'utils/axios'

import BlogHeaderMedia from 'components/Blog/BlogHeaderMedia'
import BlogHeader from 'components/Blog/BlogHeader'
import BlogNavigation from 'components/Blog/BlogNavigation'
import MDXComponents from 'components/Blog/MDXComponents'

import connectDB from 'mongoose/connectDB'
import BlogModel from 'mongoose/Blog'

interface Props {
	mdxSource: MdxRemote.Source
	title: string
	category: string
	createdAt: string
	prevPost: string
	nextPost: string
	description: string
	banner: string
	altText: string
	totalViews: number
	slug: string
}

const Blog = ({
	slug,
	mdxSource,
	title,
	category,
	createdAt,
	prevPost,
	nextPost,
	banner,
	altText,
	description,
	totalViews,
}: Props) => {
	const content = hydrate(mdxSource, {
		components: {
			...MDXComponents,
		},
	})

	const { data, mutate } = useSWR(`/api/views/${slug}`, fetcher)

	useEffect(() => {
		const cancelTokenSource = mainAxios.CancelToken.source()

		;(async () => {
			try {
				await axios.post(`/api/views/${slug}`, {
					cancelToken: cancelTokenSource.token,
				})

				mutate()
			} catch (_) {}
		})()
		return () => {
			cancelTokenSource.cancel()
		}
	}, [])

	return (
		<>
			<NextSeo
				{...{ title }}
				openGraph={{
					images: [
						{
							url: banner,
							alt: altText,
						},
					],
				}}
			/>

			<main className='row content__page'>
				<article className='column large-full entry format-standard'>
					<BlogHeaderMedia imagePath={banner} altText={altText} />

					<BlogHeader
						{...{
							totalViews: data ? data.data.totalViews : totalViews,
							title,
							createdAt,
							category,
						}}
					/>

					<p className='lead'>{description}</p>

					{content}

					<BlogNavigation {...{ prevPost, nextPost }} />
				</article>
			</main>
		</>
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

	const nextPost = allPostOfCategory[currentBlogIndex + 1]?.slug || ''
	const prevPost = allPostOfCategory[currentBlogIndex - 1]?.slug || ''

	return {
		props: {
			...neededData,
			mdxSource,
			prevPost,
			nextPost,
			createdAt: createdAt.toDateString(),
			slug,
		},
	}
}

export default Blog
