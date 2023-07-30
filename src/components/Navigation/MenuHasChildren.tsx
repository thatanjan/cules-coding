import { useState } from 'react'
import dynamic from 'next/dynamic'
import clsx from 'clsx'

const SubMenu = dynamic(() => import('./SubMenu'))

interface Props {
	menuName: string
	subMenuList: Array<string>
	classes: Array<string>
	focusClick: Function
	closeResponsiveNav: () => void
}

const MenuHasChildren = ({
	focusClick,
	menuName,
	subMenuList,
	classes,
	closeResponsiveNav,
}: Props) => {
	const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)

	return (
		<li className={clsx('has-children', ...classes)}>
			{/* TODO: Need to take care of eslint */}
			{/* eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/interactive-supports-focus */}
			<a
				className={clsx(isSubMenuOpen && 'sub-menu-is-open')}
				role='button'
				onClick={() => {
					setIsSubMenuOpen(!isSubMenuOpen)
					focusClick()
				}}
				style={{ cursor: 'pointer' }}
			>
				{menuName}
			</a>

			{isSubMenuOpen && (
				<SubMenu {...{ menuName, subMenuList, closeResponsiveNav }} />
			)}
		</li>
	)
}

export default MenuHasChildren
