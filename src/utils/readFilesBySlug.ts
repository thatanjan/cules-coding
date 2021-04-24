import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import MatterData from 'interfaces/MatterData'

import { getFilesByDate } from './getFiles'

const root = process.cwd()

const readFilesBySlug = (category: string, file: string) => {
	return fs.readFileSync(
		path.join(root, 'src/blogs/categories', `${category}/${file}`),
		'utf8'
	)
}

interface Matter extends MatterData {
	title: string
}

export const readAllFrontMatters = (category: string) => {
	const allFiles = getFilesByDate(category, 'descending').map(fileName =>
		fileName.replace('.mdx', '')
	)

	const allFilesData = allFiles.map(fileName =>
		readFilesBySlug(category, fileName)
	)

	const allFilesFrontMatter: Matter[] = allFilesData
		.map(fileData => matter(fileData).data)
		.map((matter, index) => ({
			...(matter as MatterData),
			title: allFiles[index].replace('-', ' '),
		}))

	return allFilesFrontMatter
}

export default readFilesBySlug
