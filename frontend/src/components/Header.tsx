import React, { CSSProperties } from 'react';
import useResponsive from '../hooks/useResponsive';
import Logo from './Logo';
import globalStyles from '../theme';

interface HeaderProps {
	url: string;
	setUrl: (url: string) => void;
	variant?: 'big' | 'small';
}

const Header: React.FC<HeaderProps> = ({
	url,
	setUrl,
	variant = 'big',
}) => {
	const { isMobile } = useResponsive();

	const styles: {
		[key: string]: CSSProperties;
	} = {
		container: {
			position: variant === 'big' ? 'relative' : 'absolute',
			width: '100%',
			top: '0',
			left: '0',
			margin: variant === 'big' ? '0' : `${globalStyles.spacing.double} 0`,
		},
		categoriesWrapper: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: isMobile && variant !== 'small' ? 'column' : 'row',
			transform: variant === 'big' ? 'scale(1)' : 'scale(0.5)',
			transformOrigin: 'top center',
			marginTop: variant === 'big' ? globalStyles.spacing.double : globalStyles.spacing.standard,
		},
		text: {
			userSelect: 'none',
			WebkitTextStroke: `2.5px ${globalStyles.colors.yellow}`,
			color: 'rgba(0,0,0,0)',
		},
		selectedText: {
			WebkitTextStroke: '0',
			color: globalStyles.colors.yellow,
		},
		plusSign: {
			margin: isMobile ? `-${globalStyles.spacing.standard} 0` : '0',
		},
	};

	const textStyle = (selected: boolean) => {
		return {
			...styles.text,
			...(selected && {...styles.selectedText}),
		};
	};

	const artistOnClick = () => setUrl('/artist');

	const writerOnClick = () => setUrl('/writer');

	return (
		<div style={styles.container}>
			<Logo setUrl={setUrl} />

			<div style={styles.categoriesWrapper}>
				<a onClick={artistOnClick}>
					<h2 style={textStyle(url === '/artist')}>Artist</h2>
				</a>
				<h2 style={{ ...styles.text, ...styles.plusSign} }>&nbsp;+&nbsp;</h2>
				<a onClick={writerOnClick}>
					<h2 style={textStyle(url === '/writer')}>Writer</h2>
				</a>
			</div>
		</div>
	);
};

export default Header;