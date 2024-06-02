import React, { CSSProperties } from 'react';
import { PortableText, PortableTextBlockComponent, PortableTextReactComponents } from '@portabletext/react';
import { TypedObject } from '@portabletext/types';
import { Image } from '../../../../types';

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
			textIndent: '2.5rem',
			lineHeight: '1.6rem',
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
}) =>  {
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
		normal: BlockComponent,
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