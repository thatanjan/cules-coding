import Image from 'next/image'

interface Props {
	imagePath: string
	altText: string
}

const BlogImage = ({ imagePath, altText }: Props) => {
	return (
		<Image
			layout='responsive'
			height={720}
			width={1280}
			src={imagePath}
			alt={altText}
		/>
	)
}

export default BlogImage
