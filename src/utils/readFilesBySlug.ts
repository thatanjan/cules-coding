import fs from 'fs'
import path from 'path'

const root = process.cwd()

const readFilesBySlug = (filePath: string[]) => {
	return fs.readFileSync(path.join(root, 'src', 'blogs', ...filePath), 'utf8')
}

export default readFilesBySlug
