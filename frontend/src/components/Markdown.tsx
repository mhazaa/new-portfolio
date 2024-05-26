import React, { CSSProperties } from 'react';
import { PortableText, PortableTextBlockComponent, PortableTextReactComponents } from '@portabletext/react';
import { TypedObject } from '@portabletext/types';
import { Image } from '../../../types';

/*interface BlockComponentProps {
	children: JSX.Element;
}*/

const BlockComponent: PortableTextBlockComponent | undefined = ({
	//@ts-ignore
	children,
}) =>  {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		paragraph: {
			textIndent: '2rem',
			lineHeight: '2rem',
		},
	};

	return (
		<p style={styles.paragraph}>
			{children}
		</p>
	);
};

interface ImageComponentProps {
	value: Image;
}

const ImageComponent: React.FC<ImageComponentProps> = ({
	value,
}) =>  {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		image: {
			width: '100%',
		},
	};

	return (
		<img style={styles.image} src={value.src} alt={value.alt} />
	);
};

const markdownComponents: Partial<PortableTextReactComponents> = {
	block: {
		normal: BlockComponent,
	},
	types: {
		image: ImageComponent,
	},
};
	
interface SanityMarkdownProps {
	markdown: TypedObject | TypedObject[];
}

const SanityMarkdown: React.FC<SanityMarkdownProps> = ({
	markdown,
}) => {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		container: {
		},
	};

	return (
		<div style={styles.container}>
			<PortableText
				value={markdown}
				components={markdownComponents}
			/>
		</div>
	);
};

export default SanityMarkdown;