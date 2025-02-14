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
	const { isMobile } = useResponsive();
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
			alignItems: isMobile && variant !== 'small' ? 'center' : 'stretch',
			flexDirection: isMobile && variant !== 'small' ? 'column' : 'row',
			transform: variant === 'big' ? 'scale(1)' : 'scale(0.5)',
			transformOrigin: 'top center',
			marginTop: variant === 'big' ? globalStyles.spacing.double : globalStyles.spacing.standard,
		},
		seperator: {
			background: globalStyles.colors.yellow,
			height: isMobile && variant !== 'small' ? '3px' : 'auto',
			width: isMobile && variant !== 'small' ? '50px' : '3px',
			margin: isMobile && variant !== 'small' ? `${globalStyles.spacing.double} 0` : `0 ${globalStyles.spacing.double}`,
			animation: `header-seperator-animation ${globalStyles.transitions.slow} forwards`,
		},
	};

	const artistTextStyle = () => {
		if (isArtistUrl && !writerHovered) return animations.titleInk();
		return artistHovered ? animations.titleInk() : animations.titleInkInactive();
	};

	const writerTextStyle = () => {
		if (isWriterUrl && !artistHovered) return animations.titleInk();
		return writerHovered ? animations.titleInk() : animations.titleInkInactive();
	};

	const artistOnClick = () => setUrl('/artist');

	const writerOnClick = () => setUrl('/writer');

	return (
		<div style={styles.container}>
			<Logo setUrl={setUrl} />

			<div style={styles.categoriesWrapper}>
				<a
					onMouseEnter={() => setArtistHovered(true)}
					onMouseLeave={() => setArtistHovered(false)}
					onClick={artistOnClick}
				>
					<h2
						style={artistTextStyle()}
						className='unselectable'
					>
						Artist
					</h2>
				</a>
				<div style={styles.seperator} />
				<a
					onMouseEnter={() => setWriterHovered(true)}
					onMouseLeave={() => setWriterHovered(false)}
					onClick={writerOnClick}
				>
					<h2
						style={writerTextStyle()}
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