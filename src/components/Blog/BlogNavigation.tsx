import React from 'react'
import Link from 'next/link'

interface Props {
	prevPost?: string
	nextPost?: string
	nextPostTitle: string
	prevPostTitle: string
}

const BlogNavigation = ({
	prevPost,
	nextPost,
	nextPostTitle,
	prevPostTitle,
}: Props) => {
	return (
		<div className='entry__pagenav'>
			<div className='entry__nav'>
				{prevPost && (
					<div className='entry__prev'>
						<Link href={`/blog/${prevPost}`}>
							<a>
								<span>Previous Post</span>
								{prevPostTitle}
							</a>
						</Link>
					</div>
				)}

				{nextPost && (
					<div className='entry__next'>
						<Link href={`/blog/${nextPost}`}>
							<a>
								<span>Next Post</span>
								{nextPostTitle}
							</a>
						</Link>
					</div>
				)}
			</div>
		</div>
	)
}

export default BlogNavigation
