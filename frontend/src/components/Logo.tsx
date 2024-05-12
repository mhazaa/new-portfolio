import React, { CSSProperties } from 'react';
import globalStyles from '../theme';
import logo from '../assets/logo.svg';
import { Pages } from '../../../types';

interface LogoProps {
	changePageUrl: (pageUrl: Pages) => void;
}

const Logo: React.FC<LogoProps> = ({
	changePageUrl,
}) => {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		container: {
			display: 'flex',
			width: '100%',
			maxWidth: '250px',
			margin: `0 auto ${globalStyles.spacing.double} auto`,
		},
		logoHiddenText: {
			position: 'absolute',
			textIndent: '-999999999px',
		},
		logoImg: {
			width: '100%',
		},
	};

	const onClick = () => changePageUrl('/');

	return (
		<a style={styles.container} onClick={onClick}>
			<h1 style={styles.logoHiddenText}>
				Magdi Hazaa
			</h1>
			<img style={styles.logoImg} src={logo} alt='Magdi Hazaa' />
		</a>
	);
};

export default Logo;