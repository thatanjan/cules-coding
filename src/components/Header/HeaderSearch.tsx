import React, { useState } from 'react'

interface Props {}

const HeaderSearch = (props: Props) => {
	const [searchTerm, setSearchTerm] = useState('')
	return (
		<div>
			<div className='header__search'>
				<form role='search' method='get' className='header__search-form' action='#'>
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
						/>
					</label>
					<input type='submit' className='header__search-submit' value='Search' />
				</form>

				<a href='#0' title='Close Search' className='header__search-close'>
					Close
				</a>
			</div>
		</div>
	)
}

export default HeaderSearch
