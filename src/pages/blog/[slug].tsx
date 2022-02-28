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

import { Blog } from 'interfaces/Blog'

import BlogHeaderMedia from 'components/Blog/BlogHeaderMedia'
import BlogHeader from 'components/Blog/BlogHeader'
import BlogNavigation from 'components/Blog/BlogNavigation'
import MDXComponents from 'components/Blog/MDXComponents'

import connectDB from 'mongoose/connectDB'
import BlogModel from 'mongoose/Blog'
import OutroModel from 'mongoose/Outro'

interface Props extends Blog {
	mdxSource: MdxRemote.Source
	prevPost: string
	nextPost: string
	outroMdxSource: MdxRemote.Source
	nextPostTitle: string
	prevPostTitle: string
}

const BlogPage = ({
	slug,
	customID,
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
	readingTime,
	outroMdxSource,
	nextPostTitle,
	prevPostTitle,
}: Props) => {
	const content = hydrate(mdxSource, {
		components: {
			...MDXComponents,
		},
	})
	const outroContent = hydrate(outroMdxSource, {
		components: { ...MDXComponents },
	})

	const { data, mutate } = useSWR(`/api/views/${customID}`, fetcher)

	useEffect(() => {
		const cancelTokenSource = mainAxios.CancelToken.source()

		;(async () => {
			try {
				await axios.post(`/api/views/${customID}`, {
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
				{...{
					title,
					description,
					canonical: `https://www.culescoding.space/blog/${slug}`,
				}}
				openGraph={{
					title,
					description,
					url: `https://www.culescoding.space/blog/${slug}`,
					type: 'article',
					article: {
						publishedTime: createdAt,
						authors: ['Anjan Shomodder'],
						tags: [category],
					},
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
							readingTime,
						}}
					/>

					<p className='lead'>{description}</p>

					{content}

					{outroContent}

					<BlogNavigation
						{...{ prevPost, nextPost, nextPostTitle, prevPostTitle }}
					/>
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
	const { content: outroContent } = await OutroModel.findOne({ title: 'outro' })

	const outroMdxSource = await renderToString(outroContent, {
		components: MDXComponents,
	})

	const blog = await BlogModel.findOne({ slug })

	const { category } = blog

	const { _id: _, __v: __, content, createdAt, ...neededData } = blog.toObject()

	const mdxSource = await renderToString(content, {
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
	const nextPostTitle = allPostOfCategory[currentBlogIndex + 1]?.title || ''
	const prevPostTitle = allPostOfCategory[currentBlogIndex - 1]?.title || ''

	return {
		props: {
			...neededData,
			mdxSource,
			prevPost,
			nextPost,
			createdAt: createdAt.toDateString(),
			slug,
			outroMdxSource,
			nextPostTitle,
			prevPostTitle,
		},
	}
}

export default BlogPage
