import React, { CSSProperties, ReactNode } from 'react';
import { globalStyles } from '../theme';

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
			position: variant === 'fullscreen' ? 'absolute' : 'relative',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			top: variant === 'fullscreen' ? '50%' : '0',
			left: '0',
			height: variant === 'fullscreen' ? '100%' : 'auto',
			width: '100%',
			transform: variant === 'fullscreen' ? 'translateY(-50%)' : 'translate(0)',
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