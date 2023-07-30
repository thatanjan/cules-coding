import { RefObject, FormEvent, useState, createRef, useEffect } from 'react'
import { useRouter } from 'next/router'

interface Props {
	searchBoxHandler: (val: boolean) => void
}

const HeaderSearch = ({ searchBoxHandler }: Props) => {
	const [searchTerm, setSearchTerm] = useState('')
	const { push } = useRouter()

	const closeSearchBox = () => searchBoxHandler(false)

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		push(`/search/${searchTerm}`)
		closeSearchBox()
	}

	const inputRef: RefObject<HTMLInputElement> = createRef()

	useEffect(() => {
		inputRef.current.focus()
	}, [])

	return (
		<div>
			<div className='header__search'>
				<form className='header__search-form' onSubmit={handleSubmit}>
					{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
					<label>
						<span className='hide-content'>Search for:</span>
						<input
							type='search'
							className='header__search-field'
							placeholder='Type Keywords'
							value={searchTerm}
							name='s'
							title='Search for:'
							autoComplete='off'
							onChange={e => setSearchTerm(e.target.value)}
							ref={inputRef}
						/>
					</label>
					<input type='submit' className='header__search-submit' />
				</form>

				<a
					href='#0'
					title='Close Search'
					className='header__search-close'
					onClick={closeSearchBox}
				>
					Close
				</a>
			</div>
		</div>
	)
}

export default HeaderSearch
