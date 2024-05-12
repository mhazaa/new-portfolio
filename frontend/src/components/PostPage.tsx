import React, { useEffect, CSSProperties } from 'react';
import AnalyticsEngineClient from '@mhazaa/analytics-engine/client';
//import SanityMarkdown from './SanityMarkdown';
import useResponsive from '../hooks/useResponsive';
import globalStyles from '../theme';
import backArrow from '../assets/back_arrow.svg';
import { Post, Pages } from '../../../types';

interface PostPageProps extends Post {
	changePageUrl: (pageUrl: Pages) => void;
}

const PostPage: React.FC<PostPageProps> = ({
	id,
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
		mediumYear: {
			marginBottom: globalStyles.spacing.half,
		},
		contentWrapper: {
			display: 'flex',
			flexDirection: 'column',
			position: 'relative',
			width: isMobile ? '100%' : isTablet ? '85%' : '70%',
			left: isMobile ? '0' : isTablet ? '15%' : '30%',
			margin: `${globalStyles.spacing.postPadding} 0`,
		},
	};

	useEffect(() => {
		AnalyticsEngineClient.sendMetric(`Viewed ${title}__${id}`);
	}, []);

	const backArrowOnClick = () => changePageUrl('/');

	return (
		<div style={styles.container}>
			<div style={styles.titleWrapper}>
				<a style={styles.backArrowWrapper} onClick={backArrowOnClick}>
					<img style={styles.backArrow} src={backArrow} alt='Back arrow' />
				</a>
				<h2 style={styles.title}>{title}</h2>
				<h4 style={styles.mediumYear}>{medium}, {year}</h4>
				{publication && <h5>{publication}</h5>}
			</div>

			<div style={styles.contentWrapper}>
				{/*markdown &&
					<SanityMarkdown markdown={markdown} />
				*/}
			</div>
		</div>
	);
};

export default PostPage;