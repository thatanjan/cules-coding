/* eslint react/jsx-key: 0 */

import { useState } from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import vsDark from 'prism-react-renderer/themes/vsDark'

const CodeBlock = ({ children, className }) => {
	const [isCopied, setIsCopied] = useState(false)

	const language = className ? className.replace(/language-/, '') : ''

	const handleCopy = () => {
		navigator.clipboard.writeText(children)
		setIsCopied(true)

		setTimeout(() => setIsCopied(false), 2000)
	}

	return (
		<Highlight
			{...defaultProps}
			theme={vsDark}
			code={children.trim()}
			language={language}
		>
			{({ className, style, tokens, getLineProps, getTokenProps }) => (
				<div className='code__container'>
					<pre
						className={className}
						style={{ ...style, padding: '2rem', paddingTop: '8rem' }}
					>
						<button className='btn btn--copy' type='button' onClick={handleCopy}>
							{isCopied ? 'Copied!' : 'Copy'}
						</button>

						{tokens.map((line, i) => (
							<div key={i} {...getLineProps({ line, key: i })}>
								{line.map((token, key) => (
									<span key={key} {...getTokenProps({ token, key })} />
								))}
							</div>
						))}
					</pre>
				</div>
			)}
		</Highlight>
	)
}

export default CodeBlock
