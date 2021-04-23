import fs from 'fs'
import path from 'path'

const root = process.cwd()

const getFiles = (dirPath: string) => {
	return fs.readdirSync(path.join(root, 'src/blogs/catagories', dirPath))
}

export const getFilesByDate = (
	dirPath: string,
	order: 'asscending' | 'descending'
) => {
	return getFiles(dirPath)
		.map(fileName => ({
			name: fileName,
			time: fs
				.statSync(
					process.cwd() + '/src/blogs/catagories/' + dirPath + '/' + fileName
				)
				.mtime.getTime(),
		}))
		.sort((a, b) => {
			if (order === 'asscending') return a.time - b.time

			return b.time - a.time
		})
		.map(v => v.name)
}

export default getFiles
