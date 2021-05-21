import React from 'react'

interface Props {
	src: string
	title: string
}

const Iframe = ({ src, title }: Props) => {
	return (
		<iframe
			{...{ title, src }}
			frameBorder='0'
			allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
			allowFullScreen
		/>
	)
}

export default Iframe
