import React from 'react'
import Link from 'next/link'
import NextImage from 'next/image'
import Masonry from 'react-masonry-css'
import { nanoid } from 'nanoid'

import MatterData from 'interfaces/MatterData'

const breakpointColumnsObj = {
	default: 3,
	1500: 2,
	800: 1,
}

export interface MatterDataWithTitle extends MatterData {
	title: string
	slug: string
}

export interface Props {
	categories: Array<MatterDataWithTitle>
}

const MasnoryCategories = ({ categories }: Props) => {
	const redirectLink = (slug: string) => `category/${slug}`

	return (
		<div className='masonry-wrap'>
			<div className='masonry'>
				<Masonry
					breakpointCols={breakpointColumnsObj}
					className='my-masonry-grid'
					columnClassName='my-masonry-grid_column'
				>
					{categories.map(({ slug, title, banner, altText, description }) => {
						return (
							<article
								className='masonry__brick entry format-standard '
								style={{ padding: 0 }}
								key={nanoid()}
							>
								<div className='entry__thumb'>
									<Link href={redirectLink(slug)}>
										{/*  eslint-disable-next-line jsx-a11y/anchor-is-valid */}
										<a className='entry__thumb-link'>
											<NextImage
												layout='responsive'
												height={720}
												width={1280}
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
											<Link href={redirectLink(slug)}>{title}</Link>
										</h2>
									</div>
									<div className='entry__excerpt'>
										<p>{description}</p>
									</div>
								</div>
							</article>
						)
					})}
				</Masonry>
			</div>
		</div>
	)
}

export default MasnoryCategories
