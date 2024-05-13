import React, { CSSProperties } from 'react';
import { PortableText } from '@portabletext/react';
import useResponsive from '../hooks/useResponsive';
import globalStyles from '../theme';
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
		},
		image: {
			width: '200px',
			marginBottom: isMobile ? globalStyles.spacing.standard : '0',
			marginRight: isMobile ? '0' : globalStyles.spacing.double,
		},
		title: {
			marginBottom: globalStyles.spacing.standard,
			textAlign: isMobile ? 'center' : 'left',
		},
	};

	return (
		<div style={styles.container}>
			{image && <img style={styles.image} src={image.src} alt={image.alt} /> }
			<div>
				<h2 style={styles.title}>Bio</h2>
				<PortableText value={bio} />
			</div>
		</div>
	);
};

export default BioPage;