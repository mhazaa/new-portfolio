import globalStyles from './globalStyles';
import titleInk from '../assets//animations/title_ink.gif';

const animations = {
	titleInkInactive: () => ({
		WebkitTextStroke: '2.2px',
		WebkitTextStrokeColor: globalStyles.colors.yellow,
		color: 'transparent',
		transition: `-webkit-text-stroke-color ${globalStyles.transitions.standard}`,
	}),
	titleInk: () => ({
		WebkitTextStroke: '2.2px',
		WebkitTextStrokeColor: globalStyles.colors.yellow,
		color: 'transparent',
		transition: `-webkit-text-stroke-color ${globalStyles.transitions.standard}`,
		background: `center/120% url('${titleInk}?v=${new Date().valueOf()}') text`,
	}),
};

export default animations;