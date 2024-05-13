import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import map from '../helperFunctions/map';
import globalStyles from '../theme';
import { Pages, Post } from '../../../types';
import arrow from '../assets/arrow.svg';

interface PortfolioProps {
	posts: Post[];
	changePostUrl: (postUrl: string | null) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({
	posts,
	changePostUrl,
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
			paddingRight: globalStyles.spacing.double,
			scrollBehavior: 'smooth',
		},
		item: {
			display: 'block',
			marginTop: globalStyles.spacing.standard,
		},
		firstItem: {
			marginTop: '0',
		},
		medium: {
			marginBottom: globalStyles.spacing.half,
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
			background: globalStyles.colors.brown,
			position: 'absolute',
			height: '100%',
			width: '100%',
			top: '0',
			left: '0',
			zIndex: '0',
			opacity: '0.5',
		},
		scrollfront: {
			background: globalStyles.colors.brown,
			position: 'absolute',
			height: scrollHeight + '%',
			width: '100%',
			top: scrollPercentage + '%',
			left: '0',
			zIndex: '1',
		},
		arrowWrapperTop: {
			margin: `${globalStyles.spacing.standard} 0`,
			opacity: topArrowVisible ? '1' : '0',
			transition: `opacity ${globalStyles.transitions.fast}`,
		},
		arrowTop: {
			width: '40px',
			transform: 'rotate(180deg)',
		},
		arrowWrapperBottom: {
			marginTop: globalStyles.spacing.standard,
			opacity: bottomArrowVisible ? '1' : '0',
			transition: `opacity ${globalStyles.transitions.fast}`,
		},
		arrowBottom: {
			width: '40px',
		},
	};

	const refreshScroll = () => {
		const el = itemsWrapperEl.current;
		if (!el) return;
		const elScrollTop = el.scrollTop;
		const elHeight = el.offsetHeight;
		const elScrollHeight = el.scrollHeight;
		const maxScroll = elScrollHeight - elHeight;
		
		let sh = map(elScrollHeight / elHeight, 4, 1, 0, 100);
		if (sh >= 100) sh = 0;
		setScrollHeight(sh);

		let sp = map(elScrollTop, 0, elScrollHeight - elHeight, 0, 100 - sh);
		sp = Math.floor(sp);
		setScrollPercentage(sp);

		(elScrollTop <= 2) ? setTopArrowVisible(false) : setTopArrowVisible(true);
		(elScrollTop >= maxScroll - 2) ? setBottomArrowVisible(false) : setBottomArrowVisible(true);
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
		const elHeight = el.offsetHeight;
		const elScrollHeight = el.scrollHeight;
		const maxScroll = elScrollHeight - elHeight;
		el.scrollTo(0, maxScroll);
		setBottomArrowVisible(false);
	};

	const itemOnClick = (url: Pages, isExternal: boolean = false) => {
		if (!url) return;
		(isExternal) ? window.open(url, '_blank') : changePostUrl(url);
	};

	return (
		<div style={styles.container}>
			<a style={styles.arrowWrapperTop} onClick={topArrowOnClick}>
				<img style={styles.arrowTop} src={arrow} alt='Up arrow' />
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
							onClick={() => itemOnClick(post.url as Pages, post.isExternal)}
						>
							<h3>{post.title}</h3>
							<h4 style={styles.medium}>{post.medium}, {post.year}</h4>
							{post.publication && <h5>{post.publication}</h5>}
						</a>
					))}
				</div>
				<div style={styles.scrollbar}>
					<div style={styles.scrollback}></div>
					<div style={styles.scrollfront}></div>
				</div>
			</div>
			<a style={styles.arrowWrapperBottom} onClick={bottomArrowOnClick}>
				<img style={styles.arrowBottom} src={arrow} alt='Down arrow' />
			</a>
		</div>
	);
};

export default Portfolio;