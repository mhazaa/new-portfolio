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
		slow: '2s cubic-bezier(.07,.68,.42,.98)',
		standard: '1.2s cubic-bezier(.07,.76,.35,1.06)',
		fast: '0.2s ease',
	},
	breakpoints: {
		mobile: 568,
		tablet: 768,
		desktop: 1024,
	},
};

export default globalStyles;