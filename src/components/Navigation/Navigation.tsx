import React, { useState } from 'react'
import Link from 'next/link'
import { nanoid } from 'nanoid'
import clsx from 'clsx'

import MenuHasChildren from './MenuHasChildren'

const catagoryMenuList = ['productivity', 'react', 'css', 'javascript', 'html']

const CATAGORY = 'catagory'

const menuNames = ['home', CATAGORY, 'about', 'portfolio', 'youtube', 'contact']

const Navigation = () => {
	const [focusedMenuIndex, setFocusedMenuIndex] = useState<null | number>(null)

	return (
		<nav className='header__nav-wrap'>
			<ul className='header__nav'>
				{menuNames.map((menuName, index) => {
					if (menuName === CATAGORY)
						return (
							<MenuHasChildren
								key={nanoid()}
								classes={[focusedMenuIndex === index ? 'current' : '']}
								{...{ subMenuList: catagoryMenuList, menuName: 'catagory' }}
								focusClick={() => setFocusedMenuIndex(index)}
							/>
						)

					return (
						<li
							className={clsx(focusedMenuIndex === index && 'current')}
							key={nanoid()}
						>
							<Link href={menuName === 'home' ? '/' : `/${menuName}`}>
								<a onClick={() => setFocusedMenuIndex(index)}>{menuName}</a>
							</Link>
						</li>
					)
				})}
			</ul>

			<ul className='header__social'>
				<li className='ss-facebook'>
					<a href='https://facebook.com/'>
						<span className='screen-reader-text'>Facebook</span>
					</a>
				</li>
				<li className='ss-twitter'>
					<a href='#0'>
						<span className='screen-reader-text'>Twitter</span>
					</a>
				</li>
				<li className='ss-dribbble'>
					<a href='#0'>
						<span className='screen-reader-text'>Dribbble</span>
					</a>
				</li>
				<li className='ss-pinterest'>
					<a href='#0'>
						<span className='screen-reader-text'>Behance</span>
					</a>
				</li>
			</ul>
		</nav>
	)
}

export default Navigation
