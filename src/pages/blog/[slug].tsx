import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import readFilesBySlug from 'utils/readFilesBySlug'

import BlogHeaderMedia from 'components/Blog/BlogHeaderMedia'
import BlogHeader from 'components/Blog/BlogHeader'
import BlogNavigation from 'components/Blog/BlogNavigation'

import getFiles from 'utils/getFiles'

interface Props {}

const Blog = (props: Props) => {
	return (
		<div className='s-content content'>
			<main className='row content__page'>
				<article className='column large-full entry format-standard'>
					<BlogHeaderMedia imagePath='/ts.jpg' altText='taylor swift' />

					<BlogHeader
						title='why react'
						date={new Date().toDateString()}
						catagory='react'
					/>

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

	const readFile = readFilesBySlug(slugCatagory, slug as string)

	return {
		props: {},
	}
}

export default Blog
