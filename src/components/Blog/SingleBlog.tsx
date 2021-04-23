import React from 'react'
import NextImage from 'next/image'

export interface Blog {
	title: string
	description: string
	banner: string
	altText: string
	createdAt: string
	category: string
}

const SinglePost = ({
	title,
	banner,
	altText,
	createdAt,
	category,
	description,
}: Blog) => {
	return (
		<>
			<article className='masonry__brick entry format-standard '>
				<div className='entry__thumb'>
					<a href='single-standard.html' className='entry__thumb-link'>
						<NextImage
							layout='responsive'
							height={1080}
							width={1080}
							src={banner}
							alt={altText}
						/>
					</a>
				</div>

				<div className='entry__text'>
					<div className='entry__header'>
						<h2 className='entry__title'>
							<a href='single-standard.html'>{title}</a>
						</h2>
						<div className='entry__meta'>
							<span className='entry__meta-cat'>
								<a href='category.html'>{category}</a>
							</span>
							<span className='entry__meta-date'>
								<a href='#'>{createdAt}</a>
							</span>
							<span className='entry__meta-blog__views'>1000 views</span>
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
