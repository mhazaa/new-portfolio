import React, { useEffect, CSSProperties } from 'react';
import AnalyticsEngineClient from '@mhazaa/analytics-engine/client';

const Error: React.FC = () => {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		container: {
			textAlign: 'center',
		},
	};

	useEffect(() => {
		AnalyticsEngineClient.sendMetric('VIEWED_ERROR_PAGE');
	}, []);

	return (
		<div style={styles.container}>
			<h2>404<br/>Not Found</h2>
		</div>
	);
};

export default Error;