import React, { CSSProperties } from 'react';
import { PortableText } from '@portabletext/react';
import { TypedObject } from '@portabletext/types';

const ImageComponent = ({
	//@ts-ignore
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
		//@ts-ignore
		<img style={styles.image} src={value.src} alt={value.alt} />
	);
};

const markdownComponents = {
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