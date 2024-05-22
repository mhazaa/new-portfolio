import React, { useEffect, CSSProperties } from 'react';
import AnalyticsEngineClient from '@mhazaa/analytics-engine/client';
import Markdown from './Markdown';
import useResponsive from '../hooks/useResponsive';
import globalStyles from '../theme';
import backArrow from '../assets/back_arrow.svg';
import { Post } from '../../../types';

interface PostPageProps extends Post {
	setUrl: (url: string) => void;
	openExternalUrl: (externalUrl?: string) => void;
}

const PostPage: React.FC<PostPageProps> = ({
	id,
	title,
	medium,
	year,
	publication,
	externalUrl,
	category,
	markdown,
	setUrl,
	openExternalUrl,
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
		contentWrapper: {
			display: 'flex',
			flexDirection: 'column',
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

	return (
		<div style={styles.container}>
			<div style={styles.titleWrapper}>
				<a style={styles.backArrowWrapper} onClick={backArrowOnClick}>
					<img style={styles.backArrow} src={backArrow} alt='Back arrow' />
				</a>
				<h2>{title}</h2>
				<h4 style={styles.mediumYear}>{medium}, {year}</h4>
				{publication &&
					<a style={styles.publication} onClick={() => openExternalUrl(externalUrl)}>
						<h5>{publication}</h5>
					</a>
				}
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