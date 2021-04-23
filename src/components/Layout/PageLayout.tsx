import React, { ReactNode } from 'react'

import Header from 'components/Header/Header'
import Footer from './Footer'

interface Props {
	children: ReactNode
}

const PageLayout = ({ children }: Props) => {
	return (
		<div id='top' className='s-wrap site-wrapper'>
			<Header />
			{children}
			<Footer />
		</div>
	)
}

export default PageLayout
