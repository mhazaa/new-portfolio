import React, { CSSProperties } from 'react';
import arrow from '../assets/arrow.svg';
import { globalStyles } from '../theme';

interface PortfolioItem {
	title: string;
	medium: string;
}

interface PortfolioNavProps {
	portfolioItems: PortfolioItem[];
}

const PortfolioNav: React.FC<PortfolioNavProps> = ({
	portfolioItems,
}) => {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		container: {
			display: 'flex',
			alignItems: 'center',
			flexDirection: 'column',
		},
		contentWrapper: {
			position: 'relative',
			display: 'flex',
		},
		itemsWrapper: {
			height: '300px',
			overflowY: 'scroll',
			paddingRight: '30px',
		},
		item: {
			display: 'block',
			marginTop: '10px',
		},
		firstItem: {
			marginTop: '0',
		},
		scrollbar: {
			position: 'absolute',
			height: '90%',
			width: '3px',
			top: '5%',
			right: '0',
		},
		scrollback: {
			background: globalStyles.colors.orangeSecondary,
			position: 'absolute',
			height: '100%',
			width: '100%',
			top: '0',
			left: '0',
			zIndex: '0',
			opacity: '0.65',
		},
		scrollfront: {
			background: globalStyles.colors.brownPrimary,
			position: 'absolute',
			height: '50%',
			width: '100%',
			top: '0',
			left: '0',
			zIndex: '1',
		},
		arrowWrapper: {
			marginTop: '10px',
		},
		arrow: {
			width: '40px',	
		},
	};

	const itemOnClick = () => {
		console.log('item clicked');
	};

	const arrowOnClick = () => {
		console.log('arrow clicked');
	};

	return (
		<div style={styles.container}>
			<div style={styles.contentWrapper}>
				<div style={styles.itemsWrapper}>
					{portfolioItems.map((item: PortfolioItem, i) => (
						<a
							style={{
								...styles.item,
								...(i === 0 && {...styles.firstItem})
							}}
							key={i}
							onClick={itemOnClick}
						>
							<h3>{item.title}</h3>
							<h4>{item.medium}</h4>
						</a>
					))}
				</div>
				<div style={styles.scrollbar}>
					<div style={styles.scrollback}></div>
					<div style={styles.scrollfront}></div>
				</div>
			</div>
			<a style={styles.arrowWrapper} onClick={arrowOnClick}>
				<img style={styles.arrow} src={arrow} alt='arrow down' />
			</a>
		</div>
	);
};

export default PortfolioNav;