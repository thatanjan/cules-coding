import React from 'react'
import NextImage from 'next/image'

interface Props {
	imagePath: string
	altText: string
}

const BlogHeaderMedia = ({ imagePath, altText }: Props) => {
	return (
		<div className='media-wrap entry__media'>
			<div className='entry__post-thumb'>
				<NextImage
					layout='responsive'
					height={720}
					width={1280}
					src={imagePath}
					alt={altText}
				/>
			</div>
		</div>
	)
}

export default BlogHeaderMedia
