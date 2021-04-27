import Document, { Html, Head, Main, NextScript } from 'next/document'

const description =
	'Cules coding is blogging site. People can read about programming, data structure, algorithms and many more'

class MyDocument extends Document {
	render() {
		return (
			<Html lang='en' prefix='og: https://ogp.me/ns#'>
				<Head>
					<meta property='og:type' content='blog' />
					<meta property='og:locale' content='en_US' />
					<meta property='og:site_name' content='Cules Coding' />
					<meta property='og:description' content={description} />
					<meta property='og:image' content='../../public/cules-coding-banner.jpg' />
				</Head>

				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
