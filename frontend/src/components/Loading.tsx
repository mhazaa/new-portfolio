import React, { CSSProperties } from 'react';

const Loading: React.FC = () => {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		container: {
			textAlign: 'center',
		},
	};

	return (
		<div style={styles.container}>
			<h2>Loading...</h2>
		</div>
	);
};

export default Loading;