import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import AnalyticsEngineClient from '@mhazaa/analytics-engine/client';
import { openExternalUrl } from '../routing';
import useResponsive from '../hooks/useResponsive';
import map from '../helperFunctions/map';
import { Pointer } from './Cursor';
import { globalStyles } from '../theme';
import { Post } from '../../../types';
import arrow from '../assets/arrow.svg';

interface PortfolioProps {
	posts: Post[];
	showScrollbar?: boolean;
	setUrl: (url: string) => void;
};

const Portfolio: React.FC<PortfolioProps> = ({
	posts,
	showScrollbar = true,
	setUrl,
}) => {
	const { isMobile, isTablet, isDesktop } = useResponsive();
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
			display: 'flex',
			position: 'relative',
		},
		scrollbar: {
			position: 'absolute',
			height: '100%',
			width: '3px',
			left: '0',
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
		postLabelsWrapper: {
			display: 'flex',
			flexDirection: 'column',
			height: '250px',
			maxWidth: isMobile ? '250px' : isTablet ? '275px' : isDesktop ? '300px' : '325px',
			overflowY: 'scroll',
			overflowX: 'hidden',
			paddingLeft: showScrollbar ? globalStyles.spacing.double : 0,
			scrollBehavior: 'smooth',
		},
		postLabel: {
			marginTop: globalStyles.spacing.standard,
		},
		firstPostLabel: {
			marginTop: '0',
		},
		titleMediumWrapper: {
			display: 'block',
		},
		labelTitle: {
		},
		labelMediumYear: {
			marginTop: globalStyles.spacing.half,
		},
		labelPublication: {
			display: 'block',
			marginTop: globalStyles.spacing.half,
		},
		arrowTopWrapper: {
			display: 'inline-block',
			marginTop: `${globalStyles.spacing.double}`,
			marginBottom: `${globalStyles.spacing.standard}`,
			opacity: topArrowVisible ? '1' : '0',
		},
		arrowTop: {
			width: '35px',
			transform: 'rotate(180deg)',
		},
		arrowBottomWrapper: {
			display: 'inline-block',
			marginTop: globalStyles.spacing.standard,
			opacity: bottomArrowVisible ? '1' : '0',
		},
		arrowBottom: {
			width: '35px',
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

		// eslint-disable-next-line
		(elScrollTop <= 2) ? setTopArrowVisible(false) : setTopArrowVisible(true);
		// eslint-disable-next-line
		(elScrollTop >= maxScroll - 2) ? setBottomArrowVisible(false) : setBottomArrowVisible(true);
	};

	useEffect(() => {
		AnalyticsEngineClient.sendMetric('VIEWED_PORTFOLIO');

		refreshScroll();
		itemsWrapperEl.current?.addEventListener('scroll', refreshScroll);
		return () => itemsWrapperEl.current?.removeEventListener('scroll', refreshScroll);
	}, []);

	useEffect(() => {
		refreshScroll();
	}, [posts]);

	const topArrowOnClick = () => {
		if (!topArrowVisible) return;
		const el = itemsWrapperEl.current;
		if (!el) return;
		el.scrollTo(0, 0);
		setBottomArrowVisible(false);
	};

	const bottomArrowOnClick = () => {
		if (!bottomArrowVisible) return;
		const el = itemsWrapperEl.current;
		if (!el) return;
		const elHeight = el.offsetHeight;
		const elScrollHeight = el.scrollHeight;
		const maxScroll = elScrollHeight - elHeight;
		el.scrollTo(0, maxScroll);
		setBottomArrowVisible(false);
	};

	const onClick = (internalUrl?: string, externalUrl?: string) => {
		if (internalUrl && externalUrl) return;
		if (internalUrl) itemOnClick(internalUrl);
		if (externalUrl) publicationOnClick(externalUrl);
	};

	const itemOnClick = (internalUrl?: string) => {
		if (internalUrl) setUrl(internalUrl);
	};

	const publicationOnClick = (externalUrl?: string) => {
		if (externalUrl) openExternalUrl(externalUrl);
	};

	const PostLabel = (post: Post, i: number) => {
		const onlyOneUrl =
			(post.internalUrl || post.externalUrl) && !(post.internalUrl && post.externalUrl);

		return (
			<div
				style={{
					...styles.postLabel,
					...(i === 0 && {...styles.firstPostLabel})
				}}
				className={onlyOneUrl ? 'clickable translateLineExtraHover' : ''}
				onClick={() => onlyOneUrl && onClick(post.internalUrl, post.externalUrl)}
			>
				<Pointer>
					<div
						style={styles.titleMediumWrapper}
						className={post.internalUrl && !onlyOneUrl ? 'clickable translateLineExtraHover' : ''}
						onClick={() => itemOnClick(post.internalUrl)}
					>
						<h3 style={styles.labelTitle}>{post.title}</h3>
						<h4 style={styles.labelMediumYear}>{post.medium}, {post.year}</h4>
					</div>
					{post.publication &&
						<div
							style={styles.labelPublication}
							className={post.externalUrl && !onlyOneUrl ? 'clickable translateLineExtraHover' : ''}
							onClick={() => publicationOnClick(post.externalUrl)}
						>
							<h5>{post.publication}</h5>
						</div>
					}
				</Pointer>
			</div>
		);
	};

	return (
		<div style={styles.container}>
			<a
				style={styles.arrowTopWrapper}
				className='clickable'
				onClick={topArrowOnClick}
			>
				<Pointer active={topArrowVisible}>
					<img
						style={styles.arrowTop}
						src={arrow}
						alt='Up arrow'
					/>
				</Pointer>
			</a>
			<div style={styles.contentWrapper}>
				{showScrollbar &&
					<div style={styles.scrollbar}>
						<div style={styles.scrollback}></div>
						<div style={styles.scrollfront}></div>
					</div>
				}
				
				<div style={styles.postLabelsWrapper} ref={itemsWrapperEl}>
					{posts.map((post: Post, i: number) => (
						<div key={i}>
							{PostLabel(post, i)}
						</div>
					))}
				</div>
			</div>
			<a
				style={styles.arrowBottomWrapper}
				className='clickable'
				onClick={bottomArrowOnClick}
			>
				<Pointer active={bottomArrowVisible}>
					<img
						style={styles.arrowBottom}
						src={arrow}
						alt='Down arrow'
					/>
				</Pointer>
			</a>
		</div>
	);
};

export default Portfolio;