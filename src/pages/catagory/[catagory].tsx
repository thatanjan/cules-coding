import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'

import getFiles from 'utils/getFiles'

interface Props {
	catagoryName: string
}

const Catagory = ({ catagoryName }: Props) => {
	return <>'fdf'</>
}

export const getStaticPaths: GetStaticPaths = async () => {
	const catagories = getFiles('')

	const paths = catagories.map(catagory => ({
		params: { catagory },
	}))

	return {
		paths,
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps = async ({
	params: { catagory },
}) => {
	return {
		props: { context: 1 },
	}
}

export default Catagory
