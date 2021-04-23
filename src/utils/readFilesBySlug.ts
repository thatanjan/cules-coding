import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import { getFilesByDate } from './getFiles'

const root = process.cwd()

const readFilesBySlug = (catagory: string, file: string) => {
	return fs.readFileSync(
		path.join(root, 'src/blogs/catagories', `${catagory}/${file}.mdx`),
		'utf8'
	)
}

export const readAllFrontMatters = (catagory: string) => {
	const allFiles = getFilesByDate(catagory, 'descending').map(fileName =>
		fileName.replace('.mdx', '')
	)

	const allFilesData = allFiles.map(fileName =>
		readFilesBySlug(catagory, fileName)
	)

	const allFilesFrontMatter = allFilesData
		.map(fileData => matter(fileData).data)
		.map((matter, index) => ({
			...matter,
			title: allFiles[index].replace('-', ' '),
		}))

	return allFilesFrontMatter
}

export default readFilesBySlug
