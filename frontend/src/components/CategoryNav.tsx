import React, { CSSProperties } from 'react';
import useResponsive from '../hooks/useResponsive';
import globalStyles from '../theme';
import { Pages } from '../../../types';

interface CategoryNavProps {
	pageUrl: Pages;
	changePageUrl: (pageUrl: Pages) => void;
	variant?: 'big' | 'small';
}

const CategoryNav: React.FC<CategoryNavProps> = ({
	pageUrl,
	changePageUrl,
	variant = 'big',
}) => {
	const { isMobile } = useResponsive();

	const styles: {
		[key: string]: CSSProperties;
	} = {
		container: {
			position: variant === 'big' ? 'relative' : 'fixed',
			top: '0',
			margin: variant === 'big' ? '0' : `${globalStyles.spacing.standard} 0`,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: isMobile ? 'column' : 'row',
			transform: variant === 'big' ? 'scale(1)' : 'scale(0.5)',
			transformOrigin: 'top center',
			//transition: `transform ${globalStyles.transitions.slow}, top ${globalStyles.transitions.slow}`,
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

	const artistOnClick = () => changePageUrl('/artist');

	const writerOnClick = () => changePageUrl('/writer');

	return (
		<div style={styles.container}>
			<a onClick={artistOnClick}>
				<h2 style={textStyle(pageUrl === '/artist')}>Artist</h2>
			</a>
			<h2 style={styles.text}>&nbsp;+&nbsp;</h2>
			<a onClick={writerOnClick}>
				<h2 style={textStyle(pageUrl === '/writer')}>Writer</h2>
			</a>
		</div>
	);
};

export default CategoryNav;