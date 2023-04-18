import React, { CSSProperties } from 'react';
import useResponsive from '../hooks/useResponsive';
import { globalStyles } from '../theme';
import { Pages } from '../../../types';

interface CateogryNavProps {
	page: Pages;
	changePage: (page: Pages) => void;
	variant?: 'big' | 'small';
}

const CateogryNav: React.FC<CateogryNavProps> = ({
	page,
	changePage,
	variant = 'big',
}) => {
	const { isMobile } = useResponsive();

	const styles: {
		[key: string]: CSSProperties;
	} = {
		container: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: isMobile ? 'column' : 'row',
			transform: variant === 'big' ? 'scale(1)' : 'scale(0.5)',
			transition: `transform ${globalStyles.transitions.slow}, top ${globalStyles.transitions.slow}`,
		},
		text: {
			userSelect: 'none',
			WebkitTextStroke: `3px ${globalStyles.colors.yellow}`,
			color: 'rgba(0,0,0,0)',
		},
		selectedText: {
			WebkitTextStroke: 'none',
			color: globalStyles.colors.yellow,
		},
	};

	const textStyle = (selected: boolean) => {
		return {
			...styles.text,
			...(selected && {...styles.selectedText}),
		};
	};

	const artistOnClick = () => changePage('/artist');

	const writerOnClick = () => changePage('/writer');

	return (
		<div style={styles.container}>
			<a onClick={artistOnClick}>
				<h2 style={textStyle(page === '/artist')}>Artist</h2>
			</a>
			<h2 style={styles.text}>&nbsp;+&nbsp;</h2>
			<a onClick={writerOnClick}>
				<h2 style={textStyle(page === '/writer')}>Writer</h2>
			</a>
		</div>
	);
};

export default CateogryNav;