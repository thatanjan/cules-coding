import React from 'react'
import Link from 'next/link'

import { convertSpaceToDash } from 'utils/stringConvertor'

interface Props {
	prevPost?: string
	nextPost?: string
}

const BlogNavigation = ({ prevPost, nextPost }: Props) => {
	return (
		<div className='entry__pagenav'>
			<div className='entry__nav'>
				{prevPost && (
					<div className='entry__prev'>
						<Link href={`/blog/${convertSpaceToDash(prevPost)}`}>
							<a>
								<span>Previous Post</span>
								{prevPost}
							</a>
						</Link>
					</div>
				)}

				{nextPost && (
					<div className='entry__next'>
						<Link href={`/blog/${convertSpaceToDash(nextPost)}`}>
							<a>
								<span>Next Post</span>
								{nextPost}
							</a>
						</Link>
					</div>
				)}
			</div>
		</div>
	)
}

export default BlogNavigation
