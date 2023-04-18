import React, { CSSProperties, ReactNode } from 'react';
import useResponsive from '../hooks/useResponsive';
import { globalStyles } from '../theme';

interface PageProps {
	zIndex?: string;
	variant?: 'fullscreen' | 'header' | 'sprawling';
	children: ReactNode;
}

const Page: React.FC<PageProps> = ({
	zIndex = '0',
	variant = 'fullscreen',
	children,
}) => {
	const { isMobile } = useResponsive();

	const styles: {
		[key: string]: CSSProperties;
	} = {
		container: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			position: variant === 'sprawling' ? 'relative' : 'absolute',
			top: variant === 'sprawling' ? '300px' : '0',
			left: '0',
			width: '100%',
			height: variant === 'fullscreen' ? '100%' : variant === 'header' ? '300px' : variant === 'sprawling' ? 'auto' : '100%',
			transition: `height ${globalStyles.transitions.verySlow}`,
			zIndex: zIndex,
		},
		contentWrapper: {
			width: isMobile ? '90%' : '70%',
			maxWidth: '1200px',
			
		},
	};

	return (
		<div style={styles.container}>
			<div style={styles.contentWrapper}>
				{children}
			</div>
		</div>

	);
};

export default Page;