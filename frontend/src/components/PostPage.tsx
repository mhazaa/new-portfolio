import React, { CSSProperties } from 'react';
import { PortableText } from '@portabletext/react';
import { Post, Pages } from '../../../types';
import backArrow from '../assets/back_arrow.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import AnalyticsEngineClient from '@mhazaa/analytics-engine/client';
import { postLike, postComment } from '../requests';
import { PostLikeData, PostCommentData } from '../../../types';
import useResponsive from '../hooks/useResponsive';

interface PostPageProps extends Post {
	changePage: (page: Pages) => void;
}

const PostPage: React.FC<PostPageProps> = ({
	postId,
	title,
	medium,
	url,
	year,
	markdown,
	likes,
	comments,
	changePage,
}) => {
	const { isMobile, isTablet } = useResponsive();

	const styles: {
		[key: string]: CSSProperties;
	} = {
		container: {
		},
		titleWrapper: {
			width: isMobile ? '100%' : isTablet ? '85%' : '70%',
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
			width: isMobile ? '100%' : isTablet ? '85%' : '70%',
			left: isMobile ? '0' : isTablet ? '15%' : '30%',
			margin: '60px 0',
		},
		iconsWrapper: {
			display: 'flex',
			marginTop: '60px',
		},
		likeIconWrapper: {
			width: '40px',
		},
		likeIcon: {
		},
		commentIconWrapper: {
			marginLeft: '20px',
		},
		commentIcon: {
			width: '40px',
		},
		formWrapper: {
			width: '100%',
			alignItems: 'end',
		},
		input: {
			width: '100%',
			marginTop: '20px',
		},
		textarea: {
			width: '100%',
			marginTop: '20px',
		},
		submit: {
			marginTop: '20px',
		},
	};

	const backArrowOnClick = () => changePage('/');
	
	const likeOnClick = async () => {
		const data: PostLikeData = {
			userId: AnalyticsEngineClient.getUserId(),
			postId,
		};
		
		await postLike(data);
	};

	const commentOnSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
		const form = e.target as HTMLFormElement;
		const name = form.querySelector('input[name="name"]') as HTMLInputElement;
		const comment = form.querySelector('.comment') as HTMLTextAreaElement;

		const data: PostCommentData = {
			userId: AnalyticsEngineClient.getUserId(),
			postId,
			comment: {
				name: name.value.toUpperCase(),
				comment: comment.value,
			},
		};

		await postComment(data);
	};

	console.log(markdown);

	return (
		<div style={styles.container}>
			<div style={styles.titleWrapper}>
				<a style={styles.backArrowWrapper} onClick={backArrowOnClick}>
					<img style={styles.backArrow} src={backArrow} alt='back arrow' />
				</a>
				<h2 style={styles.title}>{title}</h2>
				<h4>{medium}, {year}</h4>
			</div>

			<div style={styles.contentWrapper}>
				{markdown &&
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					//@ts-ignore
					<PortableText value={markdown} />
				}

				<div style={styles.iconsWrapper}>
					<a style={styles.likeIconWrapper} onClick={likeOnClick}>
						<img style={styles.likeIcon} src={like} alt='like' />
					</a>
					<a style={styles.commentIconWrapper}>
						<img style={styles.commentIcon} src={comment} alt='comment' />
					</a>
				</div>

				<form style={styles.formWrapper} onSubmit={commentOnSubmit}>
					<input style={styles.input} name='name' type='name' placeholder='NAME' required></input>
					<textarea style={styles.textarea} className='comment' rows={10} placeholder='COMMENT' required />
					<a><input style={styles.submit} type='submit' value="send" /></a>
				</form>
			</div>
		</div>
	);
};

export default PostPage;