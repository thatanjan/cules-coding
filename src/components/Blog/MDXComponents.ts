import Link from 'next/link'
import { ReactNode } from 'react'

import BlogImage from 'components/Blog/BlogImage'
import CodeBlock from 'components/Blog/CodeBlock'
import Codepen from 'components/Codepen'
import Iframe from 'components/Iframe'
import LazyImage from 'components/LazyImage'

const mdxComponents: Record<string, ReactNode> = {
	BlogImage,
	code: CodeBlock,
	a: Link,
	Iframe,
	Codepen,
	img: LazyImage,
}

export default mdxComponents
