import clsx from 'clsx'

interface Props {
	showButton: boolean
}

const Footer = ({ showButton }: Props) => {
	return (
		<footer className='s-footer footer'>
			<div className='row'>
				<div className='column large-full footer__content'>
					<div className='footer__copyright'>
						<span>© Copyright Cules Coding 2021</span>
						<span>
							Design by <a href='https://www.styleshout.com/'>StyleShout</a>
						</span>
					</div>
				</div>
			</div>

			<div className={clsx('go-top', showButton && 'link-is-visible')}>
				<a title='Back to Top' href='#top'></a>
			</div>
		</footer>
	)
}

export default Footer
