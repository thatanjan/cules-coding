import fs from 'fs'
import { nanoid } from 'nanoid'
import path from 'path'

const id = nanoid()

const [, , categoryName, title] = process.argv

const root = process.cwd()
const categories = fs.readdirSync(path.join(root, 'src', 'blogs', 'categories'))

if (
	!categoryName ||
	!title ||
	!categories ||
	!categories.includes(categoryName)
) {
	throw new Error('Something is missing')
}

const category = ''
const titleLowerCase = title.toLowerCase().replaceAll(' ', '-')

const fileName = `${titleLowerCase}.md`
const filePath = path.join(
	root,
	'src',
	'blogs',
	'categories',
	categoryName,
	fileName,
)
const bannerPath = path.join(
	root,
	'public',
	'blogs',
	categoryName,
	titleLowerCase,
)

const blogTemplate = `---
title: ${title}
description:
banner: /blogs/${category}/${titleLowerCase}/banner.png
altText:
customID: ${id}
---

`

;(() => {
	if (!fs.existsSync(bannerPath)) {
		fs.mkdirSync(bannerPath)
	}

	if (!fs.existsSync(filePath)) fs.appendFileSync(filePath, blogTemplate)
})()
