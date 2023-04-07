import React, { CSSProperties } from 'react';
import { globalStyles } from '../theme';

interface ComponentProps {
	a: string;
}

const Component: React.FC<ComponentProps> = ({
	a,
}) => {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		container: {
			background: globalStyles.colors.brownPrimary,
		},
	};

	return (
		<div style={styles.container}>
			<h1>{a}</h1>
		</div>
	);
};

export default Component;