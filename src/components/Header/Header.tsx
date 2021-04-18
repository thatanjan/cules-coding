import React from 'react'

import Navigation from 'components/Navigation/Navigation'

import HeaderSearch from './HeaderSearch'

interface Props {}

const Header = (props: Props) => {
	return (
		<header className='s-header'>
			<div className='header__top'>
				<div className='header__logo'>
					<a className='site-logo' href='index.html'>
						{/* <img src='images/logo.svg' alt='Homepage' /> */}
					</a>
				</div>

				<HeaderSearch />

				<a href='#0' className='header__search-trigger'></a>
				<a href='#0' className='header__menu-toggle'>
					<span>Menu</span>
				</a>
			</div>

			<Navigation />
		</header>
	)
}

export default Header
