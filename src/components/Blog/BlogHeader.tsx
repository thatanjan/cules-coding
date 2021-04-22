import React from 'react'
import Link from 'next/link'

interface Props {
	createdAt: string
	catagory: string
	title: string
}

const BlogHeader = ({ title, createdAt, catagory }: Props) => {
	return (
		<div className='content__page-header entry__header'>
			<h1 className='display-1 entry__title'>{title}</h1>
			<ul className='entry__header-meta'>
				<li className='author'>
					By <Link href='https://anjan.vercel.app/'>Anjan Shomodder</Link>
				</li>
				<li className='date'>{createdAt}</li>
				<li className='cat-links'>
					<Link href={`/catagory/${catagory}`}>{catagory}</Link>
				</li>
			</ul>
		</div>
	)
}

export default BlogHeader
