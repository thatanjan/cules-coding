import { NextSeo } from 'next-seo'
import { GetStaticProps } from 'next'
import matter from 'gray-matter'
import readingTime from 'reading-time'

import { Blog } from 'interfaces/Blog'
import MatterData from 'interfaces/MatterData'

import connectDB from 'mongoose/connectDB'
import BlogModel from 'mongoose/Blog'
import CategoryModel from 'mongoose/Category'
import OutroModel from 'mongoose/Outro'

import getFiles from 'utils/getFiles'
import readFilesBySlug from 'utils/readFilesBySlug'
import readOtherFiles from 'utils/readOtherFiles'

import MasonaryBlogs from 'components/Layout/MasonaryBlogs'

interface Props {
	category: string
	topBlogs: Array<Blog>
	recentBlogs: Array<Blog>
}

const title = 'Cules Coding'

const description =
	'Cules coding is blogging site. People can read about programming, data structure, algorithms and many more'

const Home = ({ topBlogs, recentBlogs }: Props) => {
	return (
		<>
			<NextSeo
				{...{ title, description }}
				openGraph={{
					title,
					description,
					images: [
						{
							url: '/cules-coding-banner.jpg',
							alt: description,
						},
					],
				}}
			/>

			<header className='listing-header'>
				<h1 className='h2'>Top Blogs</h1>
			</header>

			<MasonaryBlogs {...{ blogs: topBlogs }} />

			<header className='listing-header'>
				<h1 className='h2'>Recent Blogs</h1>
			</header>

			<MasonaryBlogs {...{ blogs: recentBlogs }} />
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	await connectDB()

	const eachCategory = 'eachCategory'
	const eachCategoryFileNames = getFiles([eachCategory])

	const eachCategoryFilesMatterData = eachCategoryFileNames.map(fileName => {
		const fileBuffer = readFilesBySlug([eachCategory, fileName])

		const fileMatter = matter(fileBuffer).data as MatterData

		fileMatter.slug = fileName.replace('.mdx', '')

		return fileMatter
	})

	const updateCategoriesPromises = eachCategoryFilesMatterData.map(matterData =>
		CategoryModel.updateOne(
			{ customID: matterData.customID },
			{ $set: matterData },
			{
				upsert: true,
				setDefaultsOnInsert: true,
			}
		)
	)

	await Promise.all(updateCategoriesPromises)

	const readAllBlogData = (category: string) => {
		const allFiles = getFiles(['categories', category])

		const allFilesParsedData = allFiles.map(fileName =>
			matter(readFilesBySlug(['categories', category, fileName]))
		)

		return allFilesParsedData.map(({ data, content }, index) => ({
			...(data as MatterData),
			content,
			readingTime: readingTime(content).text,
			slug: allFiles[index].replace('.mdx', ''),
			category,
		}))
	}

	const categoryNames = getFiles(['categories'])

	type AllBlogData = ReturnType<typeof readAllBlogData>

	let data: AllBlogData = [] as AllBlogData

	categoryNames.forEach(category => {
		data = data.concat(readAllBlogData(category))
	})

	const promises = data.map(blog => {
		return BlogModel.updateOne(
			{ customID: blog.customID },
			{ $set: blog },
			{
				upsert: true,
				setDefaultsOnInsert: true,
			}
		)
	})

	await Promise.all(promises)

	const outroData = readOtherFiles(['src', 'blogs', 'outro', 'outro.mdx'])

	await OutroModel.updateOne(
		{ title: 'outro' },
		{
			$set: { content: outroData },
		},
		{
			upsert: true,
		}
	)

	const aggregate = BlogModel.aggregate()

	const project = {
		_id: 0,
		__v: 0,
		content: 0,
	}

	const topBlogsResult = await aggregate
		.sort('-totalViews')
		.limit(10)
		.project(project)

	const recentBlogsResult = await aggregate
		.sort('-createdAt')
		.limit(20)
		.project(project)

	const topBlogs = topBlogsResult.map(blog => {
		blog.createdAt = blog.createdAt.toDateString()

		return blog
	})

	const recentBlogs = recentBlogsResult.map(blog => {
		blog.createdAt = blog.createdAt.toDateString()

		return blog
	})

	return {
		props: { topBlogs, recentBlogs },
		revalidate: 10,
	}
}

export default Home
