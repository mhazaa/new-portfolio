const globalStyles = {
	fontWeights: {
		thin: 100,
		light: 300,
		regular: 400,
		medium: 500,
		bold: 700,
		black: 900,
	},
	sizes: {
		maxWidth: '800px',
	},
	spacing: {
		half: '5px',
		standard: '10px',
		double: '20px',
		extraDouble: '40px',
		postPadding: '60px',
	},
	colors: {
		beige: '#ffeed9',
		orange: '#cc6933', // Background linework color
		yellow: '#ffc758',
		teal: '#8dcb97',
		brown: '#6e523b',
	},
	transitions: {
		fast: '0.2s ease',
		slow: '0.6s cubic-bezier(.07,.76,.35,1.06)',
		verySlow: '1.2s cubic-bezier(.07,.76,.35,1.06)',
	},
	breakpoints: {
		mobile: 768,
		tablet: 1024,
	},
};

export default globalStyles;