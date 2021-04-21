import React from 'react'

import BlogHeaderMedia from 'components/Blog/BlogHeaderMedia'
import BlogHeader from 'components/Blog/BlogHeader'
import BlogNavigation from 'components/Blog/BlogNavigation'

interface Props {}

const Blog = (props: Props) => {
	return (
		<div className='s-content content'>
			<main className='row content__page'>
				<article className='column large-full entry format-standard'>
					<BlogHeaderMedia imagePath='/ts.jpg' altText='taylor swift' />

					<BlogHeader
						title='why react'
						date={new Date().toDateString()}
						catagory='react'
					/>

					<BlogNavigation prevPost='yes react' />
				</article>
			</main>
		</div>
	)
}

export default Blog
