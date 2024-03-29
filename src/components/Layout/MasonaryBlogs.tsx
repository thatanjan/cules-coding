import React from 'react'
import Masonry from 'react-masonry-css'

import SingleBlog from 'components/Blog/SingleBlog'

import { Blog } from 'interfaces/Blog'
import { nanoid } from 'nanoid'

interface Props {
	blogs: Array<Blog>
}

const breakpointColumnsObj = {
	default: 3,
	1500: 2,
	800: 1,
}

const MasonaryBlogs = ({ blogs }: Props) => {
	return (
		<div className='masonry-wrap'>
			<div className='masonry'>
				<Masonry
					breakpointCols={breakpointColumnsObj}
					className='my-masonry-grid'
					columnClassName='my-masonry-grid_column'
				>
					{blogs.map(blog => {
						return <SingleBlog key={nanoid()} {...blog} />
					})}
				</Masonry>
			</div>
		</div>
	)
}

export default MasonaryBlogs
