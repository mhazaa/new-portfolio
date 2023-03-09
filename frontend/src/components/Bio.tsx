import React, { CSSProperties } from 'react';

interface BioProps {
    bio: string;
}

const Bio: React.FC<BioProps> = ({
	bio
}) => {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		text: {
		},
	};

	return (
		<div>
			<h2>Bio</h2>
			<p style={styles.text}>{bio}</p>
		</div>
	);
};

export default Bio;