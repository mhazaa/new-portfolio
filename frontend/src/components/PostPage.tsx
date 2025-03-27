import React, { useEffect, CSSProperties } from 'react';
import AnalyticsEngineClient from '@mhazaa/analytics-engine/client';
import { globalStyles, animations } from '../theme';
import { openExternalUrl } from '../routing';
import useResponsive from '../hooks/useResponsive';
import Markdown from './Markdown';
import { Pointer } from './Cursor';
import { Post } from '../../../types';
import backArrow from '../assets/back_arrow.svg';
import nextArrow from '../assets/next_arrow.svg';

interface PostPageProps extends Post {
	setUrl: (url: string) => void;
};

const PostPage: React.FC<PostPageProps> = ({
	// eslint-disable-next-line
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
	const { isMobile, isTablet, isDesktop } = useResponsive();

	const styles: {
		[key: string]: CSSProperties;
	} = {
		container: {
			marginTop: '250px',
		},
		titleWrapper: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: isMobile ? 'center' : 'start',
			width: isTablet ? '100%' : isDesktop ? '85%' : '70%',
			textAlign: isMobile ? 'center' : 'left',
		},
		backArrowWrapper: {
			display: 'inline-flex',
			position: 'relative',
			marginBottom: globalStyles.spacing.double,
		},
		backArrow: {
			width: '40px',
		},
		title: {
			display: 'inline-flex',
			...animations.titleInk('170%'),
		},
		mediumYear: {
			marginTop: globalStyles.spacing.standard,
		},
		publicationWrapper: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: isMobile ? 'center' : 'start',
		},
		publication: {
			display: 'block',
			marginTop: globalStyles.spacing.half,
		},
		nextArrowWrapper: {
			display: 'block',
			width: '80px',
			marginTop: globalStyles.spacing.standard,
			marginLeft: isMobile ? 'auto' : '0',
			marginRight: isMobile ? 'auto' : '0',
		},
		nextArrow: {
		},
		contentWrapper: {
			position: 'relative',
			width: isTablet ? '100%' : isDesktop ? '85%' : '70%',
			left: isTablet ? '0' : isDesktop ? '15%' : '30%',
			margin: isTablet ? `${globalStyles.spacing.extraDouble} 0` : `${globalStyles.spacing.postPadding} 0`,
		},
	};

	useEffect(() => {
		AnalyticsEngineClient.sendMetric(`VIEWED_POST: ${title}`);
	}, []);

	const backArrowOnClick = () => setUrl('/' + category);

	const publicationOnClick = (externalUrl?: string) => {
		if (externalUrl) openExternalUrl(externalUrl);
	};

	return (
		<div style={styles.container}>
			<div style={styles.titleWrapper}>
				<a
					style={styles.backArrowWrapper}
					className={`clickable ${isMobile ? '' : 'translateReverseHover'}`}
					onClick={backArrowOnClick}
				>
					<Pointer>
						<img style={styles.backArrow} src={backArrow} alt='Back arrow' />
					</Pointer>
				</a>
				<h2 style={styles.title} className='extraLineHeight'>{title}</h2>
				<h4 style={styles.mediumYear}>{medium}, {year}</h4>
				{publication && (
					externalUrl
						?
						<a
							style={styles.publicationWrapper}
							className={`clickable ${isMobile ? '' : 'translateHover'}`}
							onClick={() => publicationOnClick(externalUrl)}
						>
							<Pointer>
								<h5 style={styles.publication}>{publication}</h5>
								<div style={styles.nextArrowWrapper}>
									<img
										style={styles.nextArrow}
										src={nextArrow}
										alt='Open external URL arrow'
									/>
								</div>
							</Pointer>
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