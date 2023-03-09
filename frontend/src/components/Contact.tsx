import React, { CSSProperties } from 'react';

const Contact: React.FC = () => {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		formWrapper: {
			alignItems: 'end',
		},
		name: {
			width: '100%',
			marginTop: '20px',
		},
		email: {
			width: '100%',
			marginTop: '20px',
		},
		textarea: {
			width: '100%',
			marginTop: '20px',
		},
		submit: {
			marginTop: '20px',
		},
	};

	const onSubmit = () => {
		console.log('submitted');
	};

	return (
		<div>
			<h2>Contact</h2>
			<form style={styles.formWrapper} onSubmit={onSubmit}>
				<input style={styles.name} type="name" placeholder="Your name"></input>
				<input style={styles.email} type="email" placeholder="Your email"></input>
				<textarea style={styles.textarea} rows={10} placeholder="Your message" />
				<a style={styles.submit}><button>Send</button></a>
			</form>
		</div>
	);
};

export default Contact;