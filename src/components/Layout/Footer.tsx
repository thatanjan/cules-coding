import clsx from 'clsx'
import { useState, useEffect } from 'react'

const Footer = () => {
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
		<footer className='s-footer footer'>
			<div className='row'>
				<div className='column large-full footer__content'>
					<div className='footer__copyright'>
						<span>© Copyright Cules Coding 2021</span>
						<span>
							Design by <a href='https://www.styleshout.com/'>StyleShout</a>
						</span>
					</div>
				</div>
			</div>

			<div className={clsx('go-top', showButton && 'link-is-visible')}>
				<a title='Back to Top' href='#top'></a>
			</div>
		</footer>
	)
}

export default Footer
