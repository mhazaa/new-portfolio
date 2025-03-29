import React, { useState, useEffect, useRef, CSSProperties, ReactNode } from 'react';
import { useCursorContext } from '../contexts/CursorContext';
import lerp from '../helperFunctions/lerp';
import isMobileOrTablet from '../helperFunctions/isMobileOrTablet';
import { globalStyles } from '../theme';

let x = 0;
let y = 0;
let clientX = 0;
let clientY = 0;
let targetX = 0;
let targetY = 0;
const cursorRadius = 10;

export type CursorModes = 'auto' | 'pointer';

interface PointerProps {
	style?: CSSProperties;
	children: ReactNode;
};

export const Pointer: React.FC<PointerProps> = ({
	style,
	children,
}) => {
	const { setCursorMode } = useCursorContext();

	return (
		<div
			style={style}
			onMouseEnter={() => setCursorMode('pointer')}
			onMouseLeave={() => setCursorMode('auto')}
		>
			{children}
		</div>
	);
};

const Cursor: React.FC = () => {
	const { cursorMode } = useCursorContext();
	const [cursorVisibility, setCursorVisibility] = useState<boolean>(false);
	const cursorWrapper = useRef<HTMLDivElement>(null);

	const styles: {
		[key: string]: CSSProperties;
	} = {
		container: {
			display: cursorVisibility ? 'block' : 'none',
			position: 'absolute',
			zIndex: '1000',
			height: '0',
			width: '0',
			overflow: 'visible',
		},
		cursor: {
			height: cursorRadius * 2 + 'px',
			width: cursorRadius * 2 + 'px',
			pointerEvents: 'none',
		},
		fill: {
			background: globalStyles.colors.brown,
			position: 'relative',
			height: cursorRadius + 'px',
			width: cursorRadius + 'px',
			top: cursorRadius / 2 + 'px',
			left: cursorRadius / 2 + 'px',
			borderRadius: '999px',
			transform: cursorMode === 'pointer' ? 'scale(0.6)' : 'scale(1)',
			transition: `transform ${globalStyles.transitions.fast}`,
		},
		stroke: {
			fill: 'none',
			position: 'absolute',
			height: '100%',
			width: '100%',
			top: '0',
			left: '0',
			stroke: globalStyles.colors.brown,
			strokeWidth: '10px',
			strokeDasharray: cursorMode === 'pointer' ? '300' : '410',
			strokeDashoffset: cursorMode === 'pointer' ? '600' : '600',
			transition: `stroke-dasharray ${globalStyles.transitions.fast}, stroke-dashoffset ${globalStyles.transitions.fast}`,
		},
	};

	if (isMobileOrTablet()) return null;

	useEffect(() => {
		const loop = () => {
			if (!cursorWrapper.current) return;
			x = lerp(x, targetX, 0.2);
			y = lerp(y, targetY, 0.2);
			cursorWrapper.current.style.transform = `translate(${x}px, ${y}px)`;
			window.requestAnimationFrame(loop);
		};

		loop();

		const moveCursor = (e?: MouseEvent) => {
			if (e) {
				clientX = e.clientX;
				clientY = e.clientY;
			};
			
			targetX = clientX - cursorRadius;
			targetY = (clientY - cursorRadius) + window.scrollY;
		};

		const onMouseMove = (e: MouseEvent) => moveCursor(e);
		const onScroll = () => moveCursor();
		const onMouseOver = () => setCursorVisibility(true);
		const onMouseOut = () => setCursorVisibility(false);

		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('scroll', onScroll);
		window.addEventListener('mouseover', onMouseOver);
		window.addEventListener('mouseout', onMouseOut);

		return () => {
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('mouseover', onMouseOver);
			window.removeEventListener('mouseout', onMouseOut);
		};
	}, []);

	return (
		<div style={styles.container}>
			<div style={styles.cursor} ref={cursorWrapper}>
				<div style={styles.fill} />

				<svg style={styles.stroke} viewBox='0 0 100 100'>
					<circle cx='50' cy='50' r='35' />
				</svg>
			</div>
		</div>
	);
};

export default Cursor;