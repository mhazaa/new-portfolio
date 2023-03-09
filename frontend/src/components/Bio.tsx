import React from 'react';
import ReactMarkdown from 'react-markdown';

interface BioProps {
    bio: string;
}

const Bio: React.FC<BioProps> = ({
	bio
}) => (
	<div>
		<h2>Bio</h2>
		<ReactMarkdown>
			{bio}
		</ReactMarkdown>
	</div>
);

export default Bio;