import React, { CSSProperties } from 'react';
import { postContactForm } from '../requests';
import { PostContactFormData } from '../../../types';
import AnalyticsEngineClient from '@mhazaa/analytics-engine/client';

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

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const data: PostContactFormData = {
			userId: AnalyticsEngineClient.getUserId(),
			name: 'magdi hazaa',
			email: 'magdihazaa@gmail.com',
			message: 'yoyoyo',
		};
		await postContactForm(data);
	};

	return (
		<div>
			<h2>Contact</h2>
			<form style={styles.formWrapper} onSubmit={onSubmit}>
				<input style={styles.name} name='name' type='name' placeholder='YOUR NAME' required></input>
				<input style={styles.email} name='email' type="email" placeholder='YOUR EMAIL' required></input>
				<textarea style={styles.textarea} rows={10} placeholder='YOUR MESSAGE' required />
				<a><input style={styles.submit} type='submit' value="send" /></a>
			</form>
		</div>
	);
};

export default Contact;