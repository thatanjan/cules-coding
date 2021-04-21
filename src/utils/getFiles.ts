import fs from 'fs'
import path from 'path'

const root = process.cwd()

const getFiles = (dirPath: string) => {
	return fs.readdirSync(path.join(root, 'src/blogs/catagories', dirPath))
}

export default getFiles
