import React from 'react'
import Link from 'next/link'
import NextImage from 'next/image'
import useSWR from 'swr'

import fetcher from 'utils/fetcher'

import { Blog } from 'interfaces/Blog'

const SinglePost = ({
	title,
	banner,
	altText,
	createdAt,
	category,
	description,
	slug,
	totalViews,
}: Blog) => {
	const slugLink = `/blog/${slug}`

	const { data, mutate } = useSWR(`/api/views/${slug}`, fetcher)

	return (
		<>
			<article className='masonry__brick entry format-standard '>
				<div className='entry__thumb'>
					<Link href={slugLink}>
						<a className='entry__thumb-link'>
							<NextImage
								layout='responsive'
								height={1080}
								width={1080}
								src={banner}
								alt={altText}
								objectFit='cover'
							/>
						</a>
					</Link>
				</div>

				<div className='entry__text'>
					<div className='entry__header'>
						<h2 className='entry__title'>
							<Link href={slugLink}>{title}</Link>
						</h2>
						<div className='entry__meta'>
							<span className='entry__meta-cat'>
								<a href={`/category/${category}`}>{category}</a>
							</span>
							<span className='entry__meta-date'>
								<a href='#'>{createdAt}</a>
							</span>
							<span className='entry__meta-blog__views'>
								{data ? data.data.totalViews : totalViews}
							</span>
						</div>
					</div>
					<div className='entry__excerpt'>
						<p>{description}</p>
					</div>
				</div>
			</article>
		</>
	)
}

export default SinglePost
