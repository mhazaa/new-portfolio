import React from 'react';
import { PortableText } from '@portabletext/react';
import { TypedObject } from '@portabletext/types';

interface BioProps {
    bio: string | TypedObject | TypedObject[];
}

const Bio: React.FC<BioProps> = ({
	bio,
}) => (
	<div>
		<h2>Bio</h2>

		{typeof bio === 'object' ? (
			<PortableText value={bio} />
		) : typeof bio === 'string' ? (
			<p>{bio}</p>
		): null}
	</div>
);

export default Bio;