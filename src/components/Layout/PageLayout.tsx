import React, { ReactNode, useState, useEffect } from 'react'

import Header from 'components/Header/Header'
import Footer from './Footer'

interface Props {
	children: ReactNode
}

const PageLayout = ({ children }: Props) => {
	const [showButton, setShowButton] = useState(false)

	const handleScroll = () => {
		const scrollY = window.scrollY

		if (scrollY > 300) {
			setShowButton(true)
		} else {
			setShowButton(false)
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return (
		<div id='top' className='s-wrap site-wrapper'>
			<Header />
			{children}
			<Footer {...{ showButton }} />
		</div>
	)
}

export default PageLayout
