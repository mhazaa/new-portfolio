import React, { CSSProperties } from 'react';
import { PortableText, PortableTextReactComponents } from '@portabletext/react';
import { TypedObject } from '@portabletext/types';
import { Image } from '../../../../types';

interface BlockComponentProps {
	type: 'normal' | 'centered' | 'poetry';
	children: JSX.Element[];
}

const BlockComponent: React.FC<BlockComponentProps> = ({
	type,
	children,
}) => {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		paragraph: {
			textIndent: type === 'normal' ? '2.5rem' : '0',
			lineHeight: '1.6rem',
			textAlign: type === 'centered' ? 'center' : 'left',
		},
	};

	//@ts-ignore
	if (children.length === 1 && children[0] === '') return <br />;

	return (
		<p style={styles.paragraph}>
			{children}
		</p>
	);
};

const BlockComponentNormal: React.FC<BlockComponentProps> = ({
	children,
}) => {
	return (
		<BlockComponent type='normal'>
			{children}
		</BlockComponent>
	);
};

const BlockComponentCentered: React.FC<BlockComponentProps> = ({
	children,
}) => {
	return (
		<BlockComponent type='centered'>
			{children}
		</BlockComponent>
	);
};

const BlockComponentPoetry: React.FC<BlockComponentProps> = ({
	children,
}) => {
	return (
		<BlockComponent type='poetry'>
			{children}
		</BlockComponent>
	);
};

interface ImageComponentProps {
	value: Image;
}

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
}

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
		<video style={styles.video} controls>
			<source src={value.src} type="video/mp4" />
			Your browser does not support the video tag.
		</video>
	);
};

const markdownComponents: Partial<PortableTextReactComponents> = {
	block: {
		//@ts-ignore
		normal: BlockComponentNormal,
		//@ts-ignore
		centered: BlockComponentCentered,
		//@ts-ignore
		poetry: BlockComponentPoetry,
	},
	types: {
		image: ImageComponent,
		video: VideoComponent,
	},
};
	
interface MarkdownProps {
	markdown: TypedObject | TypedObject[];
}

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