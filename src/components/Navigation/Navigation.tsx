import React, { useState } from 'react'
import Link from 'next/link'
import { nanoid } from 'nanoid'
import clsx from 'clsx'

import MenuHasChildren from './MenuHasChildren'

const categoryMenuList = ['react', , 'nodejs']

const CATEGORY = 'category'

const menuNames = ['home', CATEGORY, 'portfolio', 'youtube', 'about', 'contact']

interface Props {
	closeResponsiveNav: () => void
}

const Navigation = ({ closeResponsiveNav }: Props) => {
	const [focusedMenuIndex, setFocusedMenuIndex] = useState<null | number>(null)

	return (
		<nav className='header__nav-wrap'>
			<ul className='header__nav'>
				{menuNames.map((menuName, index) => {
					if (menuName === CATEGORY)
						return (
							<MenuHasChildren
								key={nanoid()}
								classes={[focusedMenuIndex === index ? 'current' : '']}
								{...{
									subMenuList: categoryMenuList,
									menuName: 'category',
									closeResponsiveNav,
								}}
								focusClick={() => {
									setFocusedMenuIndex(index)
									closeResponsiveNav()
								}}
							/>
						)

					return (
						<li
							className={clsx(focusedMenuIndex === index && 'current')}
							key={nanoid()}
						>
							<Link href={menuName === 'home' ? '/' : `/${menuName}`}>
								<a
									onClick={() => {
										setFocusedMenuIndex(index)
										closeResponsiveNav()
									}}
								>
									{menuName}
								</a>
							</Link>
						</li>
					)
				})}
			</ul>

			<ul className='header__social'>
				<li className='ss-facebook'>
					<a href='https://facebook.com/thatanjan'>
						<span className='screen-reader-text'>Facebook</span>
					</a>
				</li>
				<li className='ss-twitter'>
					<a href='https://twitter.com/thatanjan'>
						<span className='screen-reader-text'>Twitter</span>
					</a>
				</li>
				<li className='ss-instagram'>
					<a href='https://instagram.com/thatanjan'>
						<span className='screen-reader-text'>Instagram</span>
					</a>
				</li>
				<li className='ss-linkedin'>
					<a href='https://linkedin.com/in/thatanjan'>
						<span className='screen-reader-text'>Linkedin</span>
					</a>
				</li>
			</ul>
		</nav>
	)
}

export default Navigation
