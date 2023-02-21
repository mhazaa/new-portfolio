import React, { useContext, CSSProperties } from 'react';
import GlobalContext from '../GlobalContext';
import { globalStyles } from '../theme';

const CateogryNav: React.FC = () => {
	const globalContext = useContext(GlobalContext);

	const styles: {
		[key: string]: CSSProperties;
	} = {
		container: {
			display: 'flex',
			justifyContent: 'center',
			margin: '60px 0',
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

	const artistOnClick = () => {
		console.log('artist on click');
		//selected = 'artist';
	};

	const writerOnClick = () => {
		console.log('writer on click');
		//selected = 'writer';
	};

	return (
		<div style={styles.container}>
			<a onClick={artistOnClick}>
				<h2 style={textStyle(globalContext.category === 'artist')}>Artist</h2>
			</a>
			<h2 style={styles.text}>&nbsp;+&nbsp;</h2>
			<a onClick={writerOnClick}>
				<h2 style={textStyle(globalContext.category === 'writer')}>Writer</h2>
			</a>
		</div>
	);
};

export default CateogryNav;