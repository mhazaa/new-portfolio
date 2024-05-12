import React, { CSSProperties } from 'react';
import { PortableText } from '@portabletext/react';
import globalStyles from '../theme';
import { BioPage } from '../../../types';

interface BioPageProps extends BioPage {
}

const BioPage: React.FC<BioPageProps> = ({
	image,
	bio,
}) => {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		title: {
			marginBottom: globalStyles.spacing.standard,
		},
	};

	return (
		<div>
			<h2 style={styles.title}>Bio</h2>
			{image && <img src={image.src} alt={image.alt} /> }
			<PortableText value={bio} />
		</div>
	);
};

export default BioPage;