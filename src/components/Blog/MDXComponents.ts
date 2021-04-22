import { MdxRemote } from 'next-mdx-remote/types'

import CodeBlock from 'components/Blog/CodeBlock'
import BlogImage from 'components/Blog/BlogImage'

const mdxComponents: MdxRemote.Components = { BlogImage, code: CodeBlock }

export default mdxComponents
