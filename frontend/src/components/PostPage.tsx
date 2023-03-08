import React, { CSSProperties } from 'react';
import { Post, Pages } from '../../../types';
import arrow from '../assets/arrow.svg';

interface PostPageProps extends Post {
	changePage: (page: Pages) => void;
}

const PostPage: React.FC<PostPageProps> = ({
	id,
	title,
	medium,
	url,
	year,
	tags,
	markup,
	likes,
	comments,
	changePage,
}) => {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		container: {
		},
		backArrowWrapper: {
			display: 'block',
			marginBottom: '10px',
		},
		backArrow: {
			width: '40px',
			transform: 'rotate(90deg)',
		},
		title: {
		},
		textWrapper: {
			position: 'relative',
			width: '70%',
			left: '30%',
			marginTop: '60px',
		},
	};

	const backArrowOnClick = () => changePage('');

	return (
		<div style={styles.container}>
			<a style={styles.backArrowWrapper} onClick={backArrowOnClick}>
				<img style={styles.backArrow} src={arrow} alt='back arrow' />
			</a>
			<h2 style={styles.title}>{title}</h2>
			<h4>{medium}</h4>
			<div style={styles.textWrapper}>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut elit sem. Integer vitae fermentum libero. Proin in venenatis lectus, eget hendrerit elit. Donec quis congue neque. Duis sodales euismod mauris, in sollicitudin quam posuere a. Phasellus sed congue nisl. Maecenas pellentesque lobortis cursus. Sed in tincidunt nisl. Aliquam elementum ornare volutpat.</p>
			</div>
		</div>
	);
};

export default PostPage;