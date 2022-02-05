import React from 'react'

interface Props {
	id: string
}

const Iframe = ({ id }: Props) => {
	return (
		<section className='video-container'>
			<iframe
				style={{ width: '100%' }}
				scrolling='no'
				src={`https://codepen.io/thatanjan/embed/${id}?default-tab=result&theme-id=dark`}
				frameBorder='no'
				loading='lazy'
				allowTransparency
				allowFullScreen
			/>
		</section>
	)
}

export default Iframe
