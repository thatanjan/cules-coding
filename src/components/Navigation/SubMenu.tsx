import React from 'react'

interface Props {
	menuName: string
	subMenuList: Array<string>
}

const SubMenu = ({ menuName, subMenuList }: Props) => {
	const generatePath = (subMenuName: string) => `/${menuName}/${subMenuName}`

	return (
		<ul className='sub-menu'>
			{subMenuList.map(subMenu => (
				<li>
					<a href={generatePath(subMenu)}>Lifestyle</a>
				</li>
			))}
		</ul>
	)
}

export default SubMenu
