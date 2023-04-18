import React from 'react';
import { PortableText } from '@portabletext/react';

interface BioProps {
    bio: string;
}

const Bio: React.FC<BioProps> = ({
	bio,
}) => (
	<div>
		<h2>Bio</h2>
	</div>
);

export default Bio;