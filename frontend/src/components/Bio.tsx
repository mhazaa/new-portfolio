import React, { CSSProperties } from 'react';
import globalStyles from '../theme';
import { PortableText } from '@portabletext/react';
import { TypedObject } from '@portabletext/types';

interface BioProps {
    bio: string | TypedObject | TypedObject[];
}

const Bio: React.FC<BioProps> = ({
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

			{typeof bio === 'object' ? (
				<PortableText value={bio} />
			) : typeof bio === 'string' ? (
				<p>{bio}</p>
			): null}
		</div>
	);
};

export default Bio;