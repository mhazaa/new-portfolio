import React, { useState, useEffect, CSSProperties } from 'react';
import useResponsive from '../hooks/useResponsive';
import Logo from './Logo';
import { Pointer } from './Cursor';
import { globalStyles, animations } from '../theme';

interface HeaderItemProps {
	text: string;
	onClickUrl: string;
	urlActive: boolean;
	otherUrlActive: boolean;
	setUrl: (url: string) => void;
};

const HeaderItem: React.FC<HeaderItemProps> = ({
	text,
	onClickUrl,
	urlActive,
	otherUrlActive,
	setUrl,
}) => {
	const [hovered, setIsHovered] = useState<boolean>(false);

	const onClick = () => setUrl(onClickUrl);

	useEffect(() => {
		if (!otherUrlActive) setIsHovered(false);
	}, [urlActive, otherUrlActive]);

	const textStyle = () => {
		if (urlActive) return animations.titleInk();
		return hovered ? animations.titleInk() : animations.titleInkInactive();
	};

	return (
		<a
			onMouseEnter={!urlActive ? () => setIsHovered(true) : () => {}}
			onMouseLeave={!urlActive ? () => setIsHovered(false): () => {}}
			onClick={onClick}
		>
			<Pointer active={!urlActive}>
				<h2
					style={textStyle()}
					className='unselectable'
				>
					{text}
				</h2>
			</Pointer>
		</a>
	);
};

interface HeaderProps {
	url: string;
	setUrl: (url: string) => void;
	variant?: 'big' | 'small';
};

const Header: React.FC<HeaderProps> = ({
	url,
	setUrl,
	variant = 'big',
}) => {
	const { isMobile } = useResponsive();
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
			animation: `${isMobile ? 'headerSeperatorAnimationHorizontal' : 'headerSeperatorAnimationVertical'} ${globalStyles.transitions.standard} forwards`,
		},
	};

	return (
		<div style={styles.container}>
			<Logo setUrl={setUrl} />

			<div style={styles.categoriesWrapper}>
				<HeaderItem
					text='Artist'
					onClickUrl='/artist'
					urlActive={isArtistUrl}
					otherUrlActive={isWriterUrl}
					setUrl={setUrl}
				/>
				
				<div style={styles.seperator} />

				<HeaderItem
					text='Writer'
					onClickUrl='/writer'
					urlActive={isWriterUrl}
					otherUrlActive={isArtistUrl}
					setUrl={setUrl}
				/>
			</div>
		</div>
	);
};

export default Header;