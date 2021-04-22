import React from 'react'

import BlogImage from 'components/Blog/BlogImage'

interface Props {
	imagePath: string
	altText: string
}

const BlogHeaderMedia = ({ imagePath, altText }: Props) => {
	return (
		<div className='media-wrap entry__media'>
			<div className='entry__post-thumb'>
				<BlogImage {...{ imagePath, altText }} />
			</div>
		</div>
	)
}

export default BlogHeaderMedia
