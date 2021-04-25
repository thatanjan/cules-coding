import React from 'react'
import Link from 'next/link'
import { nanoid } from 'nanoid'

interface Props {
	menuName: string
	subMenuList: Array<string>
}

const SubMenu = ({ menuName, subMenuList }: Props) => {
	const generatePath = (subMenuName: string) => `/${menuName}/${subMenuName}`

	return (
		<ul className='sub-menu' style={{ display: 'block', gridColumn: '1/3' }}>
			{subMenuList.map(subMenu => (
				<li key={nanoid()}>
					<Link href={generatePath(subMenu)}>{subMenu}</Link>
				</li>
			))}
		</ul>
	)
}

export default SubMenu
