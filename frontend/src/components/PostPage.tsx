import React, { CSSProperties } from 'react';
import ReactMarkdown from 'react-markdown';
import { Post, Pages } from '../../../types';
import backArrow from '../assets/back_arrow.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';

interface PostPageProps extends Post {
	changePage: (page?: Pages) => void;
}

const PostPage: React.FC<PostPageProps> = ({
	id,
	title,
	medium,
	url,
	year,
	tags,
	markdown,
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
		},
		title: {
		},
		contentWrapper: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'end',
			position: 'relative',
			width: '70%',
			left: '30%',
			margin: '60px 0',
		},
		iconsWrapper: {
			display: 'flex',
			marginTop: '60px',
		},
		likeWrapper: {
			width: '40px',
		},
		like: {
		},
		commentWrapper: {
			marginLeft: '20px',
		},
		comment: {
			width: '40px',
		},
	};

	const backArrowOnClick = () => changePage();
	
	const likeOnClick = () => {
		console.log('like clicked');
	};

	const commentOnClick = () => {
		console.log('comment clicked');
	};

	return (
		<div style={styles.container}>
			<a style={styles.backArrowWrapper} onClick={backArrowOnClick}>
				<img style={styles.backArrow} src={backArrow} alt='back arrow' />
			</a>
			<h2 style={styles.title}>{title}</h2>
			<h4>{medium}, {year}</h4>
			<div style={styles.contentWrapper}>
				{markdown &&
					<div>
						<ReactMarkdown>{markdown}</ReactMarkdown>
					</div>
				}

				<div style={styles.iconsWrapper}>
					<a style={styles.likeWrapper} onClick={likeOnClick}>
						<img style={styles.like} src={like} alt='like' />
					</a>
					<a style={styles.commentWrapper} onClick={commentOnClick}>
						<img style={styles.comment} src={comment} alt='comment' />
					</a>
				</div>
			</div>
		</div>
	);
};

export default PostPage;