import PageLayout from 'components/Layout/PageLayout'

import 'styles/masonry.css'
import 'styles/globals.css'
import 'styles/main.css'

const MyApp = ({ Component, pageProps }) => {
	return (
		<PageLayout>
			<Component {...pageProps} />
		</PageLayout>
	)
}

export default MyApp
