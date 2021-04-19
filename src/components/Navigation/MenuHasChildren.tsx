import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import clsx from 'clsx'

const SubMenu = dynamic(() => import('./SubMenu'))

interface Props {
	menuName: string
	subMenuList: Array<string>
}

const MenuHasChildren = ({ menuName, subMenuList }: Props) => {
	const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)

	return (
		<li className='has-children'>
			<a
				href='#0'
				title=''
				className={clsx(isSubMenuOpen && 'sub-menu-is-open')}
				onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
			>
				{menuName}
			</a>

			{isSubMenuOpen && <SubMenu {...{ menuName, subMenuList }} />}
		</li>
	)
}

export default MenuHasChildren
