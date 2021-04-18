import React from 'react'

interface Props {}

const Navigation = (props: Props) => {
	return (
		<nav className='header__nav-wrap'>
			<ul className='header__nav'>
				<li className='current'>
					<a href='index.html' title=''>
						Home
					</a>
				</li>
				<li className='has-children'>
					<a href='#0' title=''>
						Categories
					</a>
					<ul className='sub-menu'>
						<li>
							<a href='category.html'>Lifestyle</a>
						</li>
						<li>
							<a href='category.html'>Health</a>
						</li>
						<li>
							<a href='category.html'>Family</a>
						</li>
						<li>
							<a href='category.html'>Management</a>
						</li>
						<li>
							<a href='category.html'>Travel</a>
						</li>
						<li>
							<a href='category.html'>Work</a>
						</li>
					</ul>
				</li>
				<li className='has-children'>
					<a href='#0' title=''>
						Blog Posts
					</a>
					<ul className='sub-menu'>
						<li>
							<a href='single-video.html'>Video Post</a>
						</li>
						<li>
							<a href='single-audio.html'>Audio Post</a>
						</li>
						<li>
							<a href='single-gallery.html'>Gallery Post</a>
						</li>
						<li>
							<a href='single-standard.html'>Standard Post</a>
						</li>
					</ul>
				</li>
				<li>
					<a href='styles.html' title=''>
						Styles
					</a>
				</li>
				<li>
					<a href='page-about.html' title=''>
						About
					</a>
				</li>
				<li>
					<a href='page-contact.html' title=''>
						Contact
					</a>
				</li>
			</ul>

			<ul className='header__social'>
				<li className='ss-facebook'>
					<a href='https://facebook.com/'>
						<span className='screen-reader-text'>Facebook</span>
					</a>
				</li>
				<li className='ss-twitter'>
					<a href='#0'>
						<span className='screen-reader-text'>Twitter</span>
					</a>
				</li>
				<li className='ss-dribbble'>
					<a href='#0'>
						<span className='screen-reader-text'>Dribbble</span>
					</a>
				</li>
				<li className='ss-pinterest'>
					<a href='#0'>
						<span className='screen-reader-text'>Behance</span>
					</a>
				</li>
			</ul>
		</nav>
	)
}

export default Navigation
