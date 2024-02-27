import React, { CSSProperties, ReactNode } from 'react';
import globalStyles from '../theme';

interface PageProps {
	variant?: 'fullscreen' | 'sprawling';
	children: ReactNode;
}

const Page: React.FC<PageProps> = ({
	variant = 'fullscreen',
	children,
}) => {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		container: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			position: variant === 'fullscreen' ? 'absolute' : 'relative',
			top: variant === 'fullscreen' ? '50%' : '0',
			left: '0',
			width: '100%',
			height: variant === 'fullscreen' ? '100%' : 'auto',
			padding: variant === 'fullscreen' ? '0' : '200px 0',
			transform: variant === 'fullscreen' ? 'translateY(-50%)' : 'none',
			//transition: `height ${globalStyles.transitions.verySlow}`,
		},
		contentWrapper: {
			width: '90%',
			maxWidth: globalStyles.sizes.maxWidth,
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