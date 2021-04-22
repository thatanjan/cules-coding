import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'
import matter from 'gray-matter'

import readFilesBySlug from 'utils/readFilesBySlug'
import BlogHeaderMedia from 'components/Blog/BlogHeaderMedia'
import BlogHeader from 'components/Blog/BlogHeader'
import BlogNavigation from 'components/Blog/BlogNavigation'
import MDXComponents from 'components/Blog/MDXComponents'

import getFiles from 'utils/getFiles'

import MatterData from 'interfaces/MatterData'

interface Props {
	mdxSource: MdxRemote.Source
	metaData: MatterData
}

const Blog = ({
	mdxSource,
	metaData: { description, banner, altText },
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

					<BlogHeader
						title='why react'
						date={new Date().toDateString()}
						catagory='react'
					/>

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
	const catagories = getFiles('')

	const slugFileName = `${slug}.mdx`

	let slugCatagoryIndex = catagories.findIndex(catagory => {
		const catagoryFiles = getFiles(catagory)

		return catagoryFiles.includes(slugFileName)
	})

	const slugCatagory = catagories[slugCatagoryIndex]

	const fileContent = readFilesBySlug(slugCatagory, slug as string)

	const { data: metaData, content } = matter(fileContent)

	const mdxSource = await renderToString(content, {
		components: MDXComponents,
	})

	return {
		props: { mdxSource, metaData },
	}
}

export default Blog
