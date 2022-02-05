import { MdxRemote } from 'next-mdx-remote/types'
import Link from 'next/link'

import CodeBlock from 'components/Blog/CodeBlock'
import BlogImage from 'components/Blog/BlogImage'
import Iframe from 'components/Iframe'
import Codepen from 'components/Codepen'

const mdxComponents: MdxRemote.Components = {
	BlogImage,
	code: CodeBlock,
	a: Link,
	Iframe,
	Codepen: Codepen,
}

export default mdxComponents
