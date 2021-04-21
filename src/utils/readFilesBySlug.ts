import fs from 'fs'
import path from 'path'

const root = process.cwd()

const readFilesBySlug = (catagory: string, file: string) => {
	return fs.readFileSync(
		path.join(root, 'src/blogs/catagories', `${catagory}/${file}.mdx`),
		'utf8'
	)
}

export default readFilesBySlug
