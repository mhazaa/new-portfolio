import React, { CSSProperties } from 'react';
import logo from '../assets/logo.svg';

interface LogoProps {
	onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({
	onClick = () => null,
}) => {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		container: {
			display: 'flex',
			width: '100%',
		},
		logoHiddenText: {
			position: 'absolute',
			textIndent: '-999999999px',
		},
		logoImg: {
			width: '100%',
		},
	};

	return (
		<a style={styles.container} onClick={onClick}>
			<h1 style={styles.logoHiddenText}>
				Magdi Hazaa
			</h1>
			<img style={styles.logoImg} src={logo} alt='magdi hazaa' />
		</a>
	);
};

export default Logo;