import React, { useEffect, CSSProperties } from 'react';
import { PortableText } from '@portabletext/react';
import AnalyticsEngineClient from '@mhazaa/analytics-engine/client';
import useResponsive from '../hooks/useResponsive';
import { globalStyles, animations } from '../theme';
import { BioPage } from '../../../types';

// eslint-disable-next-line
interface BioPageProps extends BioPage {
};

const BioPage: React.FC<BioPageProps> = ({
	image,
	bio,
}) => {
	const { isMobile, isTablet } = useResponsive();

	const styles: {
		[key: string]: CSSProperties;
	} = {
		container: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: isMobile ? 'column' : 'row',
			textAlign: isMobile ? 'center' : 'left',
		},
		image: {
			display: 'block',
			height: 'auto',
			width: isMobile ? '180px' : isTablet ? '230px' : '260px',
			marginBottom: isMobile ? globalStyles.spacing.standard : '0',
			marginRight: isMobile ? 'auto' : globalStyles.spacing.double,
			marginLeft: isMobile ? 'auto' : '0',
		},
		title: {
			display: 'inline-block',
			marginBottom: globalStyles.spacing.standard,
			textAlign: isMobile ? 'center' : 'left',
			...animations.titleInk({
				stroke: false,
				percentage: '170%',
			}),
		},
	};

	useEffect(() => {
		AnalyticsEngineClient.sendMetric('VIEWED_BIO_PAGE');
	}, []);

	return (
		<div style={styles.container}>
			{image && !isMobile && <img style={styles.image} src={image.src} alt={image.alt} /> }
			<div>
				<h2 style={styles.title} className='unselectable'>Bio</h2>
				{image && isMobile && <img style={styles.image} src={image.src} alt={image.alt} /> }
				<div className='bioTextWrapper'>
					<PortableText value={bio} />
				</div>
			</div>
		</div>
	);
};

export default BioPage;