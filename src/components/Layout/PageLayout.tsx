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
			<div className='s-content content'>
				{children}
				<Footer />
			</div>
		</div>
	)
}

export default PageLayout
