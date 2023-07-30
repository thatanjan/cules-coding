import React from 'react'
import Link from 'next/link'
import { nanoid } from 'nanoid'

interface Props {
	menuName: string
	subMenuList: Array<string>
	closeResponsiveNav: () => void
}

const SubMenu = ({ menuName, subMenuList, closeResponsiveNav }: Props) => {
	const generatePath = (subMenuName: string) => `/${menuName}/${subMenuName}`

	return (
		<ul className='sub-menu' style={{ display: 'block', gridColumn: '1/3' }}>
			{subMenuList.map(subMenu => (
				<li key={nanoid()}>
					<Link href={generatePath(subMenu)}>
						<a href={generatePath(subMenu)} onClick={closeResponsiveNav}>
							{subMenu}
						</a>
					</Link>
				</li>
			))}

			<li key={nanoid()}>
				<Link href={`/${menuName}`}>
					<a href={`/${menuName}`} onClick={closeResponsiveNav}>
						Show all {menuName}
					</a>
				</Link>
			</li>
		</ul>
	)
}

export default SubMenu
