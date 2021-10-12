import React from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import Image from 'components/Blog/BlogImage'
import Iframe from 'components/Iframe'

const channelLink =
	'https://www.youtube.com/channel/UCBaGowNYTUsm3IDaHbLRMYw?sub_confirmation=1'

const Youtube = () => {
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
						Cules Coding is a Youtube channel where you can learn about full stack web
						development, data structure algorithms and many more.
					</p>

					<p>
						Cules coding has started it's journey on 2021. Since then it is providing
						value to all kind of programmers.
					</p>

					<h3>Goals of Cules Coding</h3>

					<ul>
						<li>Teach people learn about web development.</li>
						<li>Help people to land their dream job</li>
					</ul>

					<h2>Popular tutorials</h2>

					<section className='row'>
						<section className='column'>
							<h3>
								Setup Eslint Prettier with Typescript and React -Nextjs, Create React
								App
							</h3>
							<section className='video-container'>
								<Iframe videoID='T-n0mrssDiw' />
							</section>
						</section>
					</section>
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

export default Youtube
