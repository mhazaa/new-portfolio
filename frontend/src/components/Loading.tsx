import React, { CSSProperties } from 'react';
import { animations } from '../theme';

const Loading: React.FC = () => {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		container: {
			textAlign: 'center',
		},
		title: {
			...animations.titleInk(),
		},
	};

	return (
		<div style={styles.container}>
			<h2 style={styles.title} className='unselectable'>Loading...</h2>
		</div>
	);
};

export default Loading;