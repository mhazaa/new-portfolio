import globalStyles from './globalStyles';
import titleInk from '../assets//animations/title_ink.gif';

interface TitleInkOptions {
	stroke?: boolean;
	strokeWidth?: string;
	percentage?: string;
};

const titleInkDefaultOptions: TitleInkOptions = {
	stroke: true,
	strokeWidth: '2.2px',
	percentage: '120%',
};

const animations = {
	titleInkInactive: (titleInkOptions?: TitleInkOptions) => {
		const stroke = titleInkOptions?.stroke ?? titleInkDefaultOptions.stroke;
		const strokeWidth = titleInkOptions?.strokeWidth ?? titleInkDefaultOptions.strokeWidth;

		return {
			WebkitTextStrokeWidth: stroke ? strokeWidth : '0',
			WebkitTextStrokeColor: globalStyles.colors.yellow,
			color: 'transparent',
		};
	},
	titleInk: (titleInkOptions?: TitleInkOptions) => {
		const stroke = titleInkOptions?.stroke ?? titleInkDefaultOptions.stroke;
		const strokeWidth = titleInkOptions?.strokeWidth ?? titleInkDefaultOptions.strokeWidth;
		const percentage = titleInkOptions?.percentage ?? titleInkDefaultOptions.percentage;

		return {
			WebkitTextStrokeWidth: stroke ? strokeWidth : '0',
			WebkitTextStrokeColor: globalStyles.colors.yellow,
			color: 'transparent',
			background: `center center/${percentage} url('${titleInk}?v=${new Date().valueOf()}') text no-repeat`,
		};
	},
};

export default animations;