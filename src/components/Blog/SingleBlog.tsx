import React from 'react'
import NextImage from 'next/image'

interface Props {}

const SinglePost = (props: Props) => {
	return (
		<>
			<article className='masonry__brick entry format-standard '>
				<div className='entry__thumb'>
					<a href='single-standard.html' className='entry__thumb-link'>
						<NextImage
							layout='responsive'
							height={1080}
							width={1080}
							src='/ts.jpg'
							alt='you fucking fucker'
						/>
					</a>
				</div>

				<div className='entry__text'>
					<div className='entry__header'>
						<h2 className='entry__title'>
							<a href='single-standard.html'>Just a Standard Format Post.</a>
						</h2>
						<div className='entry__meta'>
							<span className='entry__meta-cat'>
								<a href='category.html'>Design</a>
								<a href='category.html'>Photography</a>
							</span>
							<span className='entry__meta-date'>
								<a href='#'>Apr 29, 2019</a>
							</span>
							<span className='entry__meta-blog__views'>1000 views</span>
						</div>
					</div>
					<div className='entry__excerpt'>
						<p>
							Lorem ipsum Sed eiusmod esse aliqua sed incididunt aliqua incididunt
							mollit id et sit proident dolor nulla sed commodo est ad minim elit
							reprehenderit nisi officia aute incididunt velit sint in aliqua...
						</p>
					</div>
				</div>
			</article>
		</>
	)
}

export default SinglePost
