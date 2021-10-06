import React from 'react'
import Link from 'next/link'

interface Props {
	createdAt: string
	category: string
	title: string
	totalViews: number
	readingTime: string
}

const BlogHeader = ({
	title,
	createdAt,
	category,
	totalViews,
	readingTime,
}: Props) => {
	let convertedViews: string = `${totalViews}`

	if (totalViews < 1000000) {
		convertedViews = `${(totalViews / 100).toFixed(2)}k`
	}

	return (
		<div className='content__page-header entry__header'>
			<h1 className='display-1 entry__title'>{title}</h1>
			<ul className='entry__header-meta'>
				<li className='author'>
					By <Link href='https://anjan.vercel.app/'>Anjan Shomodder</Link>
				</li>
				<li className='date'>{createdAt}</li>
				<li className='cat-links'>
					<Link href={`/category/${category}`}>{category}</Link>
				</li>
				<li className='views'>{convertedViews} views</li>
				<li className='reading_time'>{readingTime}</li>
			</ul>
		</div>
	)
}

export default BlogHeader
