import React, { CSSProperties } from 'react';

const Error: React.FC = () => {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		container: {
			textAlign: 'center',
		},
	};

	return (
		<div style={styles.container}>
			<h2>404<br/>Not Found</h2>
		</div>
	);
};

export default Error;