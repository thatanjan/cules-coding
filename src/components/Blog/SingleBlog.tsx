import React from 'react'
import Link from 'next/link'
import NextImage from 'next/image'
import useSWR from 'swr'

import fetcher from 'utils/fetcher'
import convertNumberToShortForm from 'utils/convertNumberToShortForm'

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
	readingTime,
}: Blog) => {
	const slugLink = `/blog/${slug}`

	const { data } = useSWR(`/api/views/${slug}`, fetcher)

	return (
		<>
			<article
				className='masonry__brick entry format-standard '
				style={{ padding: 0 }}
			>
				<div className='entry__thumb'>
					<Link href={slugLink}>
						<a className='entry__thumb-link'>
							<NextImage
								layout='responsive'
								height={720}
								width={1280}
								src={banner}
								alt={altText}
								objectFit='cover'
								quality={20}
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
								<Link href={`/category/${category}`}>{category}</Link>
							</span>
							<span className='entry__meta-date'>{createdAt}</span>
							<span className='entry__meta-blog__views'>
								{data
									? convertNumberToShortForm(data.data.totalViews)
									: convertNumberToShortForm(totalViews)}{' '}
								views
							</span>
							<span className='entry__meta-blog__reading_time'>{readingTime}</span>
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
