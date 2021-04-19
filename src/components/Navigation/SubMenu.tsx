import React from 'react'
import { nanoid } from 'nanoid'

interface Props {
	menuName: string
	subMenuList: Array<string>
}

const SubMenu = ({ menuName, subMenuList }: Props) => {
	const generatePath = (subMenuName: string) => `/${menuName}/${subMenuName}`

	return (
		<ul className='sub-menu' style={{ display: 'block' }}>
			{subMenuList.map(subMenu => (
				<li key={nanoid()}>
					<a href={generatePath(subMenu)}>{subMenu}</a>
				</li>
			))}
		</ul>
	)
}

export default SubMenu
