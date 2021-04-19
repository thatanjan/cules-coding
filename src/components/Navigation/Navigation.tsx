import React from 'react'
import Link from 'next/link'
import { nanoid } from 'nanoid'

import MenuHasChildren from './MenuHasChildren'

interface Props {}

const catagoryMenuList = ['productivity', 'react', 'css', 'javascript', 'html']

const CATAGORY = 'catagory'

const menuNames = ['Home', CATAGORY, 'about', 'portfolio', 'youtube', 'contact']

const Navigation = (props: Props) => {
	return (
		<nav className='header__nav-wrap'>
			<ul className='header__nav'>
				{menuNames.map(menuName => {
					if (menuName === CATAGORY)
						return (
							<MenuHasChildren
								key={nanoid()}
								{...{ subMenuList: catagoryMenuList, menuName: 'catagory' }}
							/>
						)

					return (
						<li className='current' key={nanoid()}>
							<Link href={menuName === 'home' ? '/' : `/${menuName}`}>{menuName}</Link>
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
