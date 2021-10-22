import React, { useState } from 'react'
import Link from 'next/link'
import { nanoid } from 'nanoid'
import clsx from 'clsx'

import MenuHasChildren from './MenuHasChildren'

const categoryMenuList = ['react', 'nodejs', 'css']

const CATEGORY = 'category'

const menuNames = ['home', CATEGORY, 'portfolio', 'youtube', 'about', 'contact']

interface Props {
	closeResponsiveNav: () => void
}

const Navigation = ({ closeResponsiveNav }: Props) => {
	const [focusedMenuIndex, setFocusedMenuIndex] = useState<null | number>(null)

	const generateHref = (menuName: string) => {
		switch (menuName) {
			case 'portfolio':
				return 'https://anjan.vercel.app/'

			case 'home':
				return '/'

			case 'contact':
				return 'https://anjan.vercel.app/contact'

			default:
				return `/${menuName}`
		}
	}

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
								}}
							/>
						)

					return (
						<li
							className={clsx(focusedMenuIndex === index && 'current')}
							key={nanoid()}
						>
							<Link href={generateHref(menuName)}>
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
				<li className='ss-youtube'>
					<a href='https://www.youtube.com/channel/UCBaGowNYTUsm3IDaHbLRMYw?sub_confirmation=1'>
						<span className='screen-reader-text'>Youtube</span>
					</a>
				</li>
			</ul>
		</nav>
	)
}

export default Navigation
