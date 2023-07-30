/* TODO: Need to take care of eslint */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import clsx from 'clsx'

import Navigation from 'components/Navigation/Navigation'

const HeaderSearch = dynamic(() => import('./HeaderSearch'))

const Header = () => {
	const [showHeaderSearch, setShowHeaderSearch] = useState(false)
	const [showResponsiveNav, setShowResponsiveNav] = useState(false)

	const searchBoxHandler = (val: boolean) => setShowHeaderSearch(val)

	const toggleResponsiveNav = () => setShowResponsiveNav(prev => !prev)

	const closeResponsiveNav = () => setShowResponsiveNav(false)

	return (
		<header
			className={clsx('s-header', showResponsiveNav && 'nav-wrap-is-visible')}
		>
			<div className='header__top'>
				<div className='header__logo'>
					<Link href='/'>
						<a className='site-logo'>Cules</a>
					</Link>
				</div>

				{showHeaderSearch && <HeaderSearch {...{ searchBoxHandler }} />}

				<a
					href='#'
					className='header__search-trigger'
					onClick={() => searchBoxHandler(true)}
				/>
				<a
					href='#'
					className={clsx('header__menu-toggle', showResponsiveNav && 'is-clicked')}
					onClick={toggleResponsiveNav}
				>
					<span>Menu</span>
				</a>
			</div>

			<Navigation {...{ closeResponsiveNav }} />
		</header>
	)
}

export default Header
