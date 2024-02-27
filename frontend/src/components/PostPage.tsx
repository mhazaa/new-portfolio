import React, { CSSProperties } from 'react';
import { PortableText } from '@portabletext/react';
import { Post, Pages } from '../../../types';
import AnalyticsEngineClient from '@mhazaa/analytics-engine/client';
import useResponsive from '../hooks/useResponsive';
import globalStyles from '../theme';
import backArrow from '../assets/back_arrow.svg';

interface PostPageProps extends Post {
	changePageUrl: (pageUrl: Pages) => void;
}

const PostPage: React.FC<PostPageProps> = ({
	postId,
	title,
	medium,
	year,
	publication,
	markdown,
	changePageUrl,
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
			marginBottom: globalStyles.spacing.standard,
		},
		backArrow: {
			width: '40px',
		},
		title: {
			marginBottom: globalStyles.spacing.standard,
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
	};

	const backArrowOnClick = () => changePageUrl('/');

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
					<PortableText value={markdown} />
				}
			</div>
		</div>
	);
};

export default PostPage;