import React from 'react'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'

import BlogImage from 'components/Blog/BlogImage'
import Iframe from 'components/Iframe'

const channelLink =
	'https://www.youtube.com/channel/UCBaGowNYTUsm3IDaHbLRMYw?sub_confirmation=1'

interface IframeColumnProps {
	videoID: string
	title: string
}

const IframeColumn = ({ videoID, title }: IframeColumnProps) => (
	<section className='column iframe-col'>
		<h3>{title}</h3>
		<section className='video-container'>
			<Iframe videoID={videoID} />
		</section>
	</section>
)

const Youtube = () => {
	const title = 'Hello, This is Cules Coding.'
	const description =
		'Cules Coding is a Youtube channel where you can learn about full stack web development, data structure algorithms and many more.'

	return (
		<>
			<NextSeo
				title={title}
				description={description}
				canonical='https://www.culescoding.space/youtube'
				openGraph={{
					title,
					description,
					type: 'Website',
					images: [
						{
							url: '/cules-coding-banner.jpg',
							width: 1920,
							height: 1080,
							alt: title,
						},
					],
				}}
			/>
			<main className='row content__page'>
				<section className='column large-full entry format-standard'>
					<div className='media-wrap'>
						<div>
							<BlogImage
								imagePath='/cules-coding-banner.jpg'
								quality={50}
								altText='Cules Coding Banner'
							/>
						</div>
					</div>

					<div className='content__page-header'>
						<h1 className='display-1'>{title}</h1>
					</div>

					<p className='lead '>
						Cules Coding is a Youtube channel where you can learn about full stack web
						development, data structure algorithms and many more.
					</p>

					<h2>Channel Trailer</h2>
					<Iframe videoID='tt8ERjL3DIQ' />

					<p>
						Cules coding has started it&apos;s journey on 2021. Since then it is
						providing value to all kind of programmers.
					</p>

					<h3>Goals of Cules Coding</h3>

					<ul>
						<li>Teach people learn about web development.</li>
						<li>Help people to land their dream job</li>
					</ul>

					<h2>Popular Tutorials</h2>

					<section className='row'>
						<IframeColumn
							videoID='T-n0mrssDiw'
							title='Setup Eslint Prettier with Typescript and React -Nextjs, Create React App'
						/>
						<IframeColumn
							videoID='RECwLOZdiR4'
							title='Access COOKIES in NextJS from server side. | Reactjs | SSR'
						/>
					</section>

					<section className='row'>
						<IframeColumn
							videoID='NDyjI7hd4uE'
							title='Build a carousel postcard like Instagram with reactjs, Material-UI, and swiperjs'
						/>
					</section>

					<h2>Popular Courses</h2>
					<section className='row'>
						<IframeColumn title='Material-UI Basics Course' videoID='-TVLXeM99y8' />
						<IframeColumn videoID='KYLBb1W1ZBA' title='Build a blog using JAMstack' />
					</section>
					<section className='row'>
						<IframeColumn videoID='rSa8sUC8m_4' title='Redux toolkit crash course' />
					</section>

					<a href={channelLink} target='_blank' rel='noreferrer'>
						<Image
							src='/others/subscribe.png'
							width='2361'
							height='1036'
							layout='responsive'
						/>
					</a>

					<p>
						<Link href={channelLink}>Subscribe</Link> to{' '}
						<Link href={channelLink}>Cules Coding </Link> youtube channel to watch
						awesome coding videos.
					</p>
				</section>
			</main>
		</>
	)
}

export default Youtube
