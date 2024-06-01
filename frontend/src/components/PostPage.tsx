import React, { useEffect, CSSProperties } from 'react';
import AnalyticsEngineClient from '@mhazaa/analytics-engine/client';
import { openExternalUrl } from '../routing';
import Markdown from './Markdown';
import useResponsive from '../hooks/useResponsive';
import globalStyles from '../theme';
import { Post } from '../../../types';
import backArrow from '../assets/back_arrow.svg';
import nextArrow from '../assets/next_arrow.svg';

interface PostPageProps extends Post {
	setUrl: (url: string) => void;
}

const PostPage: React.FC<PostPageProps> = ({
	id,
	title,
	medium,
	year,
	category,
	publication,
	externalUrl,
	markdown,
	setUrl,
}) => {
	const { isMobile, isTablet } = useResponsive();

	const styles: {
		[key: string]: CSSProperties;
	} = {
		container: {
			marginTop: '250px',
		},
		titleWrapper: {
			width: isMobile ? '100%' : isTablet ? '85%' : '70%',
		},
		backArrowWrapper: {
			position: 'relative',
			display: 'inline-flex',
			paddingBottom: globalStyles.spacing.double,
		},
		backArrow: {
			width: '40px',
		},
		mediumYear: {
			marginTop: globalStyles.spacing.standard,
		},
		publication: {
			display: 'block',
			marginTop: globalStyles.spacing.half,
		},
		nextArrowWrapper: {
			display: 'block',
			width: '80px',
			marginTop: globalStyles.spacing.standard,
		},
		nextArrow: {
		},
		contentWrapper: {
			position: 'relative',
			width: isMobile ? '100%' : isTablet ? '85%' : '70%',
			left: isMobile ? '0' : isTablet ? '15%' : '30%',
			margin: isMobile ? `${globalStyles.spacing.extraDouble} 0` : `${globalStyles.spacing.postPadding} 0`,
		},
	};

	useEffect(() => {
		AnalyticsEngineClient.sendMetric(`VIEWED_POST: ${title}__${id}`);
	}, []);

	const backArrowOnClick = () => setUrl('/' + category);

	const publicationOnClick = (externalUrl?: string) => {
		if (externalUrl) openExternalUrl(externalUrl);
	};

	return (
		<div style={styles.container}>
			<div style={styles.titleWrapper}>
				<a style={styles.backArrowWrapper} onClick={backArrowOnClick}>
					<img style={styles.backArrow} src={backArrow} alt='Back arrow' />
				</a>
				<h2>{title}</h2>
				<h4 style={styles.mediumYear}>{medium}, {year}</h4>
				{publication && (
					externalUrl
						?
						<a onClick={() => publicationOnClick(externalUrl)}>
							<h5 style={styles.publication}>{publication}</h5>
							<div style={styles.nextArrowWrapper}>
								<img
									style={styles.nextArrow}
									src={nextArrow}
									alt='Open external URL arrow'
								/>
							</div>
						</a>
						:
						<h5 style={styles.publication}>{publication}</h5>
				)}
			</div>

			<div style={styles.contentWrapper}>
				{markdown &&
					<Markdown markdown={markdown} />
				}
			</div>
		</div>
	);
};

export default PostPage;