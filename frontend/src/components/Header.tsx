import React, { useState, CSSProperties } from 'react';
import useResponsive from '../hooks/useResponsive';
import Logo from './Logo';
import { globalStyles, animations } from '../theme';

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
	const { isTablet } = useResponsive();
	const [artistHovered, setArtistHovered] = useState<boolean>(false);
	const [writerHovered, setWriterHovered] = useState<boolean>(false);
	const isArtistUrl = url.includes('/artist');
	const isWriterUrl = url.includes('/writer');

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
			alignItems: 'stretch',
			flexDirection: isTablet && variant !== 'small' ? 'column' : 'row',
			transform: variant === 'big' ? 'scale(1)' : 'scale(0.5)',
			transformOrigin: 'top center',
			marginTop: variant === 'big' ? globalStyles.spacing.double : globalStyles.spacing.standard,
		},
		seperator: {
			background: globalStyles.colors.yellow,
			width: '3px',
			margin: `0 ${globalStyles.spacing.double}`,
			animation: `header-seperator-animation ${globalStyles.transitions.slow} forwards`,
		},
	};
	
	const textStyle = (selected: boolean) => selected ? animations.titleInk() : animations.titleInkInactive();

	const artistOnClick = () => setUrl('/artist');

	const writerOnClick = () => setUrl('/writer');

	return (
		<div style={styles.container}>
			<Logo setUrl={setUrl} />

			<div style={styles.categoriesWrapper}>
				<a
					onMouseEnter={isArtistUrl ? () => {} : () => setArtistHovered(true)}
					onMouseLeave={isArtistUrl ? () => {} : () => setArtistHovered(false)}
					onClick={artistOnClick}
				>
					<h2
						style={textStyle(artistHovered || isArtistUrl)}
						className='unselectable'
					>
						Artist
					</h2>
				</a>
				<div style={styles.seperator} />
				<a
					onMouseEnter={isWriterUrl ? () => {} : () => setWriterHovered(true)}
					onMouseLeave={isWriterUrl ? () => {} : () => setWriterHovered(false)}
					onClick={writerOnClick}
				>
					<h2
						style={textStyle(writerHovered || isWriterUrl)}
						className='unselectable'
					>
						Writer
					</h2>
				</a>
			</div>
		</div>
	);
};

export default Header;