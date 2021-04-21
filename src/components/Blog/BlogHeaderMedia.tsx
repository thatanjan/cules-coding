import React from 'react'
import NextImage from 'next/image'

interface Props {}

const BlogHeaderMedia = (props: Props) => {
	return (
		<div className='media-wrap entry__media'>
			<div className='entry__post-thumb'>
				<NextImage
					layout='responsive'
					height={720}
					width={1280}
					src='/ts.jpg'
					alt='Blog Image'
				/>
			</div>
		</div>
	)
}

export default BlogHeaderMedia
