import React, { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import clsx from 'clsx'

const SubMenu = dynamic(() => import('./SubMenu'))

interface Props {
	menuName: string
	subMenuList: Array<string>
	classes: Array<string>
	focusClick: Function
}

const MenuHasChildren = ({
	focusClick,
	menuName,
	subMenuList,
	classes,
}: Props) => {
	const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)

	return (
		<li className={clsx('has-children', ...classes)}>
			<Link href={`/${menuName}`}>
				<a
					className={clsx(isSubMenuOpen && 'sub-menu-is-open')}
					onClick={() => {
						setIsSubMenuOpen(!isSubMenuOpen)
						focusClick()
					}}
				>
					{menuName}
				</a>
			</Link>

			<div
				className={clsx(isSubMenuOpen && 'expanded', 'submenu__expander')}
				onClick={() => {
					setIsSubMenuOpen(!isSubMenuOpen)
					console.log(122323)
				}}
			/>

			{isSubMenuOpen && <SubMenu {...{ menuName, subMenuList }} />}
		</li>
	)
}

export default MenuHasChildren
