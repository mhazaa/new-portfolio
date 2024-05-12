import React, { CSSProperties } from 'react';
import useResponsive from '../hooks/useResponsive';
import Logo from './Logo';
import globalStyles from '../theme';
import { Pages } from '../../../types';

interface HeaderProps {
	pageUrl: Pages;
	changePageUrl: (pageUrl: Pages) => void;
	variant?: 'big' | 'small';
}

const Header: React.FC<HeaderProps> = ({
	pageUrl,
	changePageUrl,
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
			flexDirection: isMobile ? 'column' : 'row',
			transform: variant === 'big' ? 'scale(1)' : 'scale(0.5)',
			transformOrigin: 'top center',
		},
		text: {
			userSelect: 'none',
			WebkitTextStroke: `3px ${globalStyles.colors.yellow}`,
			color: 'rgba(0,0,0,0)',
		},
		selectedText: {
			WebkitTextStroke: '0',
			color: globalStyles.colors.yellow,
		},
		plusSign: {
			lineHeight: isMobile ? '3.5rem' : '6.5rem',
			padding: isMobile ? `${globalStyles.spacing.standard} 0` : '0',
		},
	};

	const textStyle = (selected: boolean) => {
		return {
			...styles.text,
			...(selected && {...styles.selectedText}),
		};
	};

	const artistOnClick = () => changePageUrl('/artist');

	const writerOnClick = () => changePageUrl('/writer');

	return (
		<div style={styles.container}>
			<Logo changePageUrl={changePageUrl} />

			<div style={styles.categoriesWrapper}>
				<a onClick={artistOnClick}>
					<h2 style={textStyle(pageUrl === '/artist')}>Artist</h2>
				</a>
				<h2 style={{ ...styles.text, ...styles.plusSign} }>&nbsp;+&nbsp;</h2>
				<a onClick={writerOnClick}>
					<h2 style={textStyle(pageUrl === '/writer')}>Writer</h2>
				</a>
			</div>
		</div>
	);
};

export default Header;