import { NextSeo } from 'next-seo'
import { GetStaticProps } from 'next'
import matter from 'gray-matter'
import readingTime from 'reading-time'

import { Blog } from 'interfaces/Blog'
import MatterData from 'interfaces/MatterData'

import connectDB from 'mongoose/connectDB'
import BlogModel from 'mongoose/Blog'
import CategoryModel from 'mongoose/Category'

import getFiles from 'utils/getFiles'
import readFilesBySlug from 'utils/readFilesBySlug'

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
	console.log(topBlogs)
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

	const eachCategoryFilesMatterData = eachCategoryFileNames
		.map(fileName => readFilesBySlug([eachCategory, fileName]))
		.map(fileBuffer => matter(fileBuffer).data as MatterData)
		.map((fileMatter, index) => ({
			...fileMatter,
			slug: eachCategoryFileNames[index].replace('.mdx', ''),
		}))

	const updateCategoriesPromises = eachCategoryFilesMatterData.map(matterData =>
		CategoryModel.updateOne(
			{ title: matterData.title },
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
			{ slug: blog.slug },
			{ $set: blog },
			{
				upsert: true,
				setDefaultsOnInsert: true,
			}
		)
	})

	await Promise.all(promises)

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
