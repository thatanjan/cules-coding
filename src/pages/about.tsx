import Link from 'next/link'
import Image from 'components/Blog/BlogImage'

const channelLink =
	'https://www.youtube.com/channel/UCBaGowNYTUsm3IDaHbLRMYw?sub_confirmation=1'

const About = () => {
	return (
		<>
			<main className='row content__page'>
				<section className='column large-full entry format-standard'>
					<div className='media-wrap'>
						<div>
							<Image
								imagePath='/cules-coding-banner.jpg'
								quality={50}
								altText='Cules Coding Banner'
							/>
						</div>
					</div>

					<div className='content__page-header'>
						<h1 className='display-1'>Hello, This is Cules Coding.</h1>
					</div>

					<p className='lead '>
						Cules Coding is a blogging site where you can learn about full stack web
						development, data structure algorithms and many more.
					</p>

					<p>
						Cules coding has started it&apos;s journey on 2021. Since then it is
						providing value to all kind of programmers{' '}
					</p>

					<h3>Goals of Cules Coding</h3>

					<ul>
						<li>Teach people learn about web development.</li>
						<li>Help people to land their dream job</li>
						<li>Starting their own business</li>
					</ul>

					<h2>Want to learn more from video tutorials?</h2>

					<p>
						<Link href={channelLink}>subscribe</Link> to{' '}
						<Link href={channelLink}>Cules Coding </Link> youtube channel to watch
						awesome coding videos.
					</p>

					<Link href='/youtube'>Learn more</Link>
				</section>
			</main>
		</>
	)
}

export default About
