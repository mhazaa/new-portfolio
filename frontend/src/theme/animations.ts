import globalStyles from './globalStyles';
import titleInk from '../assets//animations/title_ink.gif';

const animations = {
	titleInkInactive: () => ({
		WebkitTextStroke: '2.2px',
		WebkitTextStrokeColor: globalStyles.colors.yellow,
		color: 'transparent',
		transition: `-webkit-text-stroke-color ${globalStyles.transitions.standard}`,
	}),
	titleInk: (
		percentage = '120%',
	) => {

		return {
			WebkitTextStroke: '2.2px',
			WebkitTextStrokeColor: globalStyles.colors.yellow,
			color: 'transparent',
			transition: `-webkit-text-stroke-color ${globalStyles.transitions.standard}`,
			background: `center center/${percentage} url('${titleInk}?v=${new Date().valueOf()}') text no-repeat`,
		};
	},
};

export default animations;