import Image from 'next/image'

interface Props {
	imagePath: string
	altText: string
	quality?: number
}

const BlogImage = ({ imagePath, altText, quality }: Props) => {
	return (
		<Image
			layout='responsive'
			height={720}
			width={1280}
			src={imagePath}
			alt={altText}
			quality={quality || 20}
			objectFit='cover'
		/>
	)
}

export default BlogImage
