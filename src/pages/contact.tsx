import React from 'react'
import dynamic from 'next/dynamic'

const Development = dynamic(() => import('components/InDevelopment'))

const Contact = () => {
	return (
		<>
			<Development />{' '}
		</>
	)
}

export default Contact
