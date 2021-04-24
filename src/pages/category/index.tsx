import React from 'react'
import path from 'path'
import fs from 'fs'
import { GetStaticProps, GetStaticPaths } from 'next'
import matter from 'gray-matter'

import MatterData from 'interfaces/MatterData'

import getFiles from 'utils/getFiles'

interface MatterDataWithTitle extends MatterData {
	title: string
}

interface Props {
	categories: Array<MatterDataWithTitle>
}

const Category = (props: Props) => {
	return <>hello world</>
}

export const getStaticProps: GetStaticProps = async () => {
	const root = process.cwd()
	const files = getFiles('../eachCategory')

	const fileDatas = files.map(fileName =>
		fs.readFileSync(path.join(root, 'src/blogs/eachCategory', fileName))
	)

	const matters: MatterDataWithTitle[] = fileDatas
		.map(fileData => matter(fileData).data as MatterData)
		.map((matter, index) => ({
			...matter,
			title: files[index].replace('.mdx', '').replace('-', ' '),
		}))

	console.log(matters)

	return {
		props: { categories: matters },
	}
}

export default Category
