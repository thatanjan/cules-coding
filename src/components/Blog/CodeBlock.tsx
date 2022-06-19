import { useState } from 'react'
import { nanoid } from 'nanoid'
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
			{({
				className: prismClassName,
				style,
				tokens,
				getLineProps,
				getTokenProps,
			}) => (
				<div className='code__container'>
					<pre
						className={prismClassName}
						style={{ ...style, padding: '2rem', paddingTop: '8rem' }}
					>
						<button className='btn btn--copy' type='button' onClick={handleCopy}>
							{isCopied ? 'Copied!' : 'Copy'}
						</button>

						{tokens.map((line, i) => (
							<div
								className='code__line'
								key={nanoid()}
								{...getLineProps({ line, key: nanoid() })}
							>
								<span className='code__line__no'>{i + 1}</span>
								<span className='code__line__content'>
									{line.map((token, key) => (
										<span key={nanoid()} {...getTokenProps({ token, key })} />
									))}
								</span>
							</div>
						))}
					</pre>
				</div>
			)}
		</Highlight>
	)
}

export default CodeBlock
