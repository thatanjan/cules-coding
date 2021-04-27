import React from 'react'
import dynamic from 'next/dynamic'

const Development = dynamic(() => import('components/InDevelopment'))

const Youtube = () => {
	return (
		<>
			<Development />{' '}
		</>
	)
}

export default Youtube
