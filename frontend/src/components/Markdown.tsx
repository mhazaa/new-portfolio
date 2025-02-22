import React, { CSSProperties, JSX } from 'react';
import { PortableText, PortableTextReactComponents } from '@portabletext/react';
import { TypedObject } from '@portabletext/types';
import { Image } from '../../../types';

interface BlockComponentProps {
	type: 'normal' | 'proseLeft' | 'proseCenter' | 'poetry';
	children: JSX.Element[];
};

const BlockComponent: React.FC<BlockComponentProps> = ({
	type,
	children,
}) => {
	// @ts-expect-error
	if (children.length === 1 && children[0] === '') return <br />;

	return (
		<p className={type}>
			{children}
		</p>
	);
};

interface ImageComponentProps {
	value: Image;
};

const ImageComponent: React.FC<ImageComponentProps> = ({
	value,
}) => {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		image: {
			maxWidth: '100%',
		},
	};

	return (
		<img style={styles.image} src={value.src} alt={value.alt} />
	);
};

interface VideoComponentProps {
	value: {
		src: string;
	};
};

const VideoComponent: React.FC<VideoComponentProps> = ({
	value,
}) => {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		video: {
			maxWidth: '100%',
		},
	};

	return (
		<video style={styles.video} controls preload='metadata'>
			<source src={`${value.src}#t=0.01`} type='video/mp4' />
			Your browser does not support the video tag.
		</video>
	);
};

const markdownComponents: Partial<PortableTextReactComponents> = {
	block: {
		normal: ({
			children,
			// @ts-expect-error
		}) => <BlockComponent type='normal'>{children}</BlockComponent>,
		proseLeft: ({
			children,
			// @ts-expect-error
		}) => <BlockComponent type='proseLeft'>{children}</BlockComponent>,
		proseCenter: ({
			children,
			// @ts-expect-error
		}) => <BlockComponent type='proseCenter'>{children}</BlockComponent>,
		poetry: ({
			children,
			// @ts-expect-error
		}) => <BlockComponent type='poetry'>{children}</BlockComponent>,
	},
	types: {
		image: ImageComponent,
		video: VideoComponent,
	},
};
	
interface MarkdownProps {
	markdown: TypedObject | TypedObject[];
};

const Markdown: React.FC<MarkdownProps> = ({
	markdown,
}) => {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		container: {
			display: 'flex',
			flexDirection: 'column',
		},
		video: {
			maxWidth: '100%',
		},
	};

	return (
		<div style={styles.container} className='markdown'>
			<PortableText
				value={markdown}
				components={markdownComponents}
			/>
		</div>
	);
};

export default Markdown;