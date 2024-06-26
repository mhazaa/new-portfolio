import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import AnalyticsEngineClient from '@mhazaa/analytics-engine/client';
import { openExternalUrl } from '../routing';
import map from '../helperFunctions/map';
import globalStyles from '../theme';
import { Post } from '../../../types';
import arrow from '../assets/arrow.svg';

interface PortfolioProps {
	posts: Post[];
	setUrl: (url: string) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({
	posts,
	setUrl,
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
		scrollbar: {
			position: 'absolute',
			height: '100%',
			width: '2px',
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
		itemsWrapper: {
			display: 'flex',
			flexDirection: 'column',
			height: '250px',
			overflowY: 'scroll',
			paddingLeft: globalStyles.spacing.double,
			scrollBehavior: 'smooth',
		},
		postLabel: {
			cursor: 'default',
			marginTop: globalStyles.spacing.standard,
		},
		firstPostLabel: {
			marginTop: '0',
		},
		item: {
			display: 'block',
		},
		publication: {
			display: 'block',
			marginTop: globalStyles.spacing.half,
		},
		arrowWrapperTop: {
			margin: `${globalStyles.spacing.double} 0`,
			opacity: topArrowVisible ? '1' : '0',
			cursor: topArrowVisible ? 'pointer' : 'default',
			transition: `opacity ${globalStyles.transitions.fast}`,
		},
		arrowTop: {
			width: '40px',
			transform: 'rotate(180deg)',
		},
		arrowWrapperBottom: {
			marginTop: globalStyles.spacing.double,
			opacity: bottomArrowVisible ? '1' : '0',
			cursor: bottomArrowVisible ? 'pointer' : 'default',
			transition: `opacity ${globalStyles.transitions.fast}`,
		},
		arrowBottom: {
			width: '40px',
		},
	};

	useEffect(() => {
		AnalyticsEngineClient.sendMetric('VIEWED_PORTFOLIO');
	}, []);

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
				className={onlyOneUrl ? 'clickable' : ''}
				onClick={() => onlyOneUrl && onClick(post.internalUrl, post.externalUrl)}
			>
				<div
					style={styles.item}
					className={post.internalUrl && !onlyOneUrl ? 'clickable' : ''}
					onClick={() => itemOnClick(post.internalUrl)}
				>
					<h3>{post.title}</h3>
					<h4>{post.medium}, {post.year}</h4>
				</div>
				{post.publication &&
					<div
						style={styles.publication}
						className={post.externalUrl && !onlyOneUrl ? 'clickable' : ''}
						onClick={() => publicationOnClick(post.externalUrl)}
					>
						<h5>{post.publication}</h5>
					</div>
				}
			</div>
		);
	};

	return (
		<div style={styles.container}>
			<a style={styles.arrowWrapperTop} onClick={topArrowOnClick}>
				<img style={styles.arrowTop} src={arrow} alt='Up arrow' />
			</a>
			<div style={styles.contentWrapper}>
				<div style={styles.scrollbar}>
					<div style={styles.scrollback}></div>
					<div style={styles.scrollfront}></div>
				</div>
				<div style={styles.itemsWrapper} ref={itemsWrapperEl}>
					{posts.map((post: Post, i: number) => (
						<div key={i}>
							{PostLabel(post, i)}
						</div>
					))}
				</div>
			</div>
			<a style={styles.arrowWrapperBottom} onClick={bottomArrowOnClick}>
				<img style={styles.arrowBottom} src={arrow} alt='Down arrow' />
			</a>
		</div>
	);
};

export default Portfolio;