import fs from 'fs'
import { nanoid } from 'nanoid'
import path from 'path'

const id = nanoid()

const [, , categoryName] = process.argv

const root = process.cwd()
const categories = fs.readdirSync(path.join(root, 'src', 'blogs', 'categories'))

if (!categoryName || categories.includes(categoryName)) {
	throw new Error('Category name is missing')
}

if (categories.includes(categoryName)) {
	throw new Error('Category Already exist')
}

const fileName = `${categoryName}.md`

const filePath = path.join(root, 'src', 'blogs', 'eachCategory', fileName)

const bannerPath = path.join('/', 'categoryBanners', `${categoryName}.png`)

// Make the first letter uppercase
const title = categoryName
	.split('-')
	.join(' ')
	.replace(/^\w/, c => c.toUpperCase())

const blogTemplate = `---
title: ${title}
description:
banner: ${bannerPath}
altText:
customID: ${id}
---

`

;(() => {
	if (!fs.existsSync(filePath)) {
		fs.appendFileSync(filePath, blogTemplate)
	}
})()
