import React, { useEffect, CSSProperties } from 'react';
import { PortableText } from '@portabletext/react';
import AnalyticsEngineClient from '@mhazaa/analytics-engine/client';
import useResponsive from '../hooks/useResponsive';
import { globalStyles, animations } from '../theme';
import { BioPage } from '../../../types';

interface BioPageProps extends BioPage {
}

const BioPage: React.FC<BioPageProps> = ({
	image,
	bio,
}) => {
	const { isMobile } = useResponsive();

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
			height: isMobile ? '150px' : 'auto',
			width: isMobile ? '150px' : '200px',
			objectFit: 'cover',
			objectPosition: 'top center',
			marginBottom: isMobile ? globalStyles.spacing.standard : '0',
			marginRight: isMobile ? 'auto' : globalStyles.spacing.double,
			marginLeft: isMobile ? 'auto' : '0',
		},
		title: {
			display: 'inline-block',
			marginBottom: globalStyles.spacing.standard,
			textAlign: isMobile ? 'center' : 'left',
			...animations.titleInk('170%'),
		},
	};

	useEffect(() => {
		AnalyticsEngineClient.sendMetric('VIEWED_BIO_PAGE');
	}, []);

	return (
		<div style={styles.container}>
			{image && !isMobile && <img style={styles.image} src={image.src} alt={image.alt} /> }
			<div>
				<h2 style={styles.title}>Bio</h2>
				{image && isMobile && <img style={styles.image} src={image.src} alt={image.alt} /> }
				<div className='bioTextWrapper'>
					<PortableText value={bio} />
				</div>
			</div>
		</div>
	);
};

export default BioPage;