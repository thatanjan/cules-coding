import React from 'react'

interface Props {
	id: string
	tab?: 'html' | 'css' | 'js' | 'result'
	title: string
}

const Iframe = ({ id, tab, title }: Props) => {
	return (
		<section className='video-container'>
			<iframe
				style={{ width: '100%' }}
				scrolling='no'
				src={`https://codepen.io/thatanjan/embed/${id}?default-tab=${
					tab || 'result'
				}&theme-id=dark`}
				frameBorder='no'
				loading='lazy'
				allowTransparency
				allowFullScreen
				title={title}
			/>
		</section>
	)
}

export default Iframe
