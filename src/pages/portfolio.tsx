import React from 'react'
import dynamic from 'next/dynamic'

const Development = dynamic(() => import('components/InDevelopment'))

const Portfolio = () => {
	return (
		<>
			<Development />{' '}
		</>
	)
}

export default Portfolio
