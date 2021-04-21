import React from 'react'

import BlogHeaderMedia from 'components/Blog/BlogHeaderMedia'
import BlogHeader from 'components/Blog/BlogHeader'

interface Props {}

const Blog = (props: Props) => {
	return (
		<div className='s-content content'>
			<main className='row content__page'>
				<article className='column large-full entry format-standard'>
					<BlogHeaderMedia />

					<BlogHeader
						title='why react'
						date={new Date().toDateString()}
						catagory='react'
					/>
				</article>
			</main>
		</div>
	)
}

export default Blog
