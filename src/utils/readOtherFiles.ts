import fs from 'fs'
import path from 'path'

const root = process.cwd()

const readOtherFiles = (filePath: string[]) => {
	return fs.readFileSync(path.join(root, ...filePath), 'utf8')
}

export default readOtherFiles
