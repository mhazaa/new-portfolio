import React, { CSSProperties } from 'react';
import background from '../assets/background.png';

const Background: React.FC = () => {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		container: {
			display: 'flex',
			position: 'fixed',
			top: '0',
			left: '0',
			height: '100%',
			width: '100%',
			justifyContent: 'center',
			alignItems: 'center',
			overflow: 'hidden',
		},
		img: {
			width: '100%',
			minWidth: '700px',
			maxWidth: '1200px',
			opacity: '0.5',
		},
	};

	return (
		<div style={styles.container}>
			<img style={styles.img} src={background} alt='Background' />
		</div>
	);
};

export default Background;