import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import arrow from '../assets/arrow.svg';
import map from '../modules/map';
import { globalStyles } from '../theme';
import { Pages, Post } from '../../../types';

interface PortfolioNavProps {
	posts: Post[];
	changePage: (page: Pages) => void;
}

const PortfolioNav: React.FC<PortfolioNavProps> = ({
	posts,
	changePage,
}) => {
	const [topArrowVisible, setTopArrowVisible] = useState<boolean>(false);
	const [bottomArrowVisible, setBottomArrowVisible] = useState<boolean>(true);
	const [scrollHeight, setScrollHeight] = useState<number>(0);
	const [scrollPercentage, setScrollPercentage] = useState<number>(0);
	const itemsWrapperEl = useRef<HTMLDivElement>(null);

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
			scrollBehavior: 'smooth',
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
			overflow: 'hidden',
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
			height: scrollHeight + '%',
			width: '100%',
			top: scrollPercentage + '%',
			left: '0',
			zIndex: '1',
		},
		arrowWrapperTop: {
			marginBottom: '10px',
			opacity: topArrowVisible ? '1' : '0',
			transition: `opacity ${globalStyles.transitions.primary}`,
		},
		arrowTop: {
			width: '40px',
			transform: 'rotate(180deg)',
		},
		arrowWrapperBottom: {
			marginTop: '10px',
			opacity: bottomArrowVisible ? '1' : '0',
			transition: `opacity ${globalStyles.transitions.primary}`,
		},
		arrowBottom: {
			width: '40px',
		},
	};

	const refreshScroll = () => {
		const el = itemsWrapperEl.current;
		if (!el) return;
		const scrollTop = el.scrollTop;
		const height = el.offsetHeight;
		const scrollHeight = el.scrollHeight;
		const maxScroll = scrollHeight - height;

		let sh = (scrollHeight - height) / 2;
		if (sh > 100) sh = 100;
		setScrollHeight(sh);

		let sp = map(scrollTop, 0, scrollHeight - height, 0, 100 - sh);
		sp = Math.floor(sp);
		setScrollPercentage(sp);
		
		(scrollTop <= 0) ? setTopArrowVisible(false) : setTopArrowVisible(true);
		(scrollTop >= maxScroll) ? setBottomArrowVisible(false) : setBottomArrowVisible(true);
	};

	useEffect(() => {
		refreshScroll();
		itemsWrapperEl.current?.addEventListener('scroll', refreshScroll);
	}, []);

	useEffect(() => {
		refreshScroll();
	}, [posts]);

	const topArrowOnClick = () => {
		const el = itemsWrapperEl.current;
		if (!el) return;
		el.scrollTo(0, 0);
		setBottomArrowVisible(false);
	};

	const bottomArrowOnClick = () => {
		const el = itemsWrapperEl.current;
		if (!el) return;
		const height = el.offsetHeight;
		const scrollHeight = el.scrollHeight;
		const maxScroll = scrollHeight - height;
		el.scrollTo(0, maxScroll);
		setBottomArrowVisible(false);
	};

	const itemOnClick = (e: React.MouseEvent) => {
		const url = e.currentTarget.getAttribute('data-url') as Pages;
		if (url) changePage(url);
	};

	return (
		<div style={styles.container}>
			<a style={styles.arrowWrapperTop} onClick={topArrowOnClick}>
				<img style={styles.arrowTop} src={arrow} alt='up arrow' />
			</a>
			<div style={styles.contentWrapper}>
				<div style={styles.itemsWrapper} ref={itemsWrapperEl}>
					{posts.map((post: Post, i) => (
						<a
							style={{
								...styles.item,
								...(i === 0 && {...styles.firstItem})
							}}
							key={i}
							data-url={post.url}
							onClick={itemOnClick}
						>
							<h3>{post.title} ({post.year})</h3>
							<h4>{post.medium}</h4>
						</a>
					))}
				</div>
				<div style={styles.scrollbar}>
					<div style={styles.scrollback}></div>
					<div style={styles.scrollfront}></div>
				</div>
			</div>
			<a style={styles.arrowWrapperBottom} onClick={bottomArrowOnClick}>
				<img style={styles.arrowBottom} src={arrow} alt='down arrow' />
			</a>
		</div>
	);
};

export default PortfolioNav;