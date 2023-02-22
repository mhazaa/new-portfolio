import React from 'react';

interface BioProps {
    bio: string;
}

const Bio: React.FC<BioProps> = ({
	bio
}) => (
	<div>
		<h2>Bio</h2>
		<p>{bio}</p>
	</div>
);

export default Bio;