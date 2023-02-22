import React, { CSSProperties } from 'react';
import { globalStyles } from '../theme';
import { Categories } from '../../../types';

interface CateogryNavProps {
	category: Categories;
	changeCategory: (category: Categories) => void;
}

const CateogryNav: React.FC<CateogryNavProps> = ({
	category,
	changeCategory,
}) => {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		container: {
			display: 'flex',
			justifyContent: 'center',
			marginBottom: '60px',
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

	const artistOnClick = () => changeCategory('artist');

	const writerOnClick = () => changeCategory('writer');

	return (
		<div style={styles.container}>
			<a onClick={artistOnClick}>
				<h2 style={textStyle(category === 'artist')}>Artist</h2>
			</a>
			<h2 style={styles.text}>&nbsp;+&nbsp;</h2>
			<a onClick={writerOnClick}>
				<h2 style={textStyle(category === 'writer')}>Writer</h2>
			</a>
		</div>
	);
};

export default CateogryNav;