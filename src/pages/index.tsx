import Masonry from 'react-masonry-css'

import SinglePost from 'components/Post/SinglePost'

const Home = () => {
	const breakpointColumnsObj = {
		default: 3,
		1500: 2,
		800: 1,
	}

	return (
		<>
			<div className='s-content'>
				<div className='masonry-wrap'>
					<div className='masonry'>
						<Masonry
							breakpointCols={breakpointColumnsObj}
							className='my-masonry-grid'
							columnClassName='my-masonry-grid_column'
						>
							{Array(20)
								.fill(3)
								.map((_, index) => {
									return <SinglePost key={index} />
								})}
						</Masonry>
					</div>
				</div>
			</div>
		</>
	)
}

export default Home
