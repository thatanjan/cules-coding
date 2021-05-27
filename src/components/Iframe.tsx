import React from 'react'

interface Props {
	videoID: string
	title: string
}

const Iframe = ({ videoID, title }: Props) => {
	return (
		<iframe
			{...{ title, src: `https://www.youtube.com/embed/${videoID}` }}
			frameBorder='0'
			allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
			allowFullScreen
		/>
	)
}

export default Iframe
