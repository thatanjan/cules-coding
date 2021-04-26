import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import clsx from 'clsx'

import Navigation from 'components/Navigation/Navigation'

const HeaderSearch = dynamic(() => import('./HeaderSearch'))

interface Props {}

const Header = (props: Props) => {
	const [showHeaderSearch, setShowHeaderSearch] = useState(false)
	const [headerMenuClicked, setHeaderMenuClicked] = useState(false)

	const searchBoxHandler = (val: boolean) => setShowHeaderSearch(val)

	return (
		<header
			className={clsx('s-header', headerMenuClicked && 'nav-wrap-is-visible')}
		>
			<div className='header__top'>
				<div className='header__logo'>
					<a className='site-logo' href='index.html'>
						{/* <img src='images/logo.svg' alt='Homepage' /> */}
					</a>
				</div>

				{showHeaderSearch && <HeaderSearch {...{ searchBoxHandler }} />}

				<a
					href='#'
					className='header__search-trigger'
					onClick={() => searchBoxHandler(true)}
				></a>
				<a
					href='#'
					className={clsx('header__menu-toggle', headerMenuClicked && 'is-clicked')}
					onClick={() => setHeaderMenuClicked(prev => !prev)}
				>
					<span>Menu</span>
				</a>
			</div>

			<Navigation />
		</header>
	)
}

export default Header
