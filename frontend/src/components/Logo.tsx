import React, { CSSProperties } from 'react';
import logo from '../assets/logo.svg';

interface LogoProps {
	setUrl: (url: string) => void;
};

const Logo: React.FC<LogoProps> = ({
	setUrl,
}) => {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		container: {
			display: 'flex',
			position: 'relative',
			width: '100%',
			maxWidth: '250px',
			margin: 'auto',
			zIndex: '999',
		},
		logoHiddenText: {
			position: 'absolute',
			textIndent: '-999999999px',
		},
		logoImg: {
			width: '100%',
		},
	};

	const onClick = () => setUrl('/');

	return (
		<a
			style={styles.container}
			className='clickable'
			onClick={onClick}
		>
			<h1 style={styles.logoHiddenText}>
				Magdi Hazaa
			</h1>
			<img
				style={styles.logoImg}
				src={logo}
				alt='Magdi Hazaa'
			/>
		</a>
	);
};

export default Logo;