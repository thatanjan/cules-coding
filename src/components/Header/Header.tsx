import React, { useState } from 'react'

import Navigation from 'components/Navigation/Navigation'

import HeaderSearch from './HeaderSearch'

interface Props {}

const Header = (props: Props) => {
	const [showHeaderSearch, setShowHeaderSearch] = useState(false)

	const searchBoxHandler = (val: boolean) => setShowHeaderSearch(val)

	return (
		<header className='s-header'>
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
					className='header__menu-toggle'
					onClick={() => searchBoxHandler(true)}
				>
					<span>Menu</span>
				</a>
			</div>

			<Navigation />
		</header>
	)
}

export default Header
