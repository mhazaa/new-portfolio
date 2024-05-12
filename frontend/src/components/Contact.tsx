import React, { CSSProperties } from 'react';
import AnalyticsEngineClient from '@mhazaa/analytics-engine/client';
import { postContactForm } from '../requests';
import globalStyles from '../theme';
import { PostContactFormData } from '../../../types';

const Contact: React.FC = () => {
	const styles: {
		[key: string]: CSSProperties;
	} = {
		title: {
			marginBottom: globalStyles.spacing.standard,
		},
		textWrapper: {
			maxWidth: '400px',
			marginBottom: globalStyles.spacing.standard,
		},
		formWrapper: {
			alignItems: 'end',
		},
		input: {
			width: '100%',
			marginBottom: globalStyles.spacing.standard,
		},
		textarea: {
			width: '100%',
			marginBottom: globalStyles.spacing.standard,
			maxHeight: '150px',
		},
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
		const form = e.target as HTMLFormElement;
		const name = form.querySelector('input[name="name"]') as HTMLInputElement;
		const email = form.querySelector('input[name="email"]') as HTMLInputElement;
		const message = form.querySelector('.message') as HTMLTextAreaElement;

		const data: PostContactFormData = {
			userId: AnalyticsEngineClient.getUserId(),
			name: name.value.toUpperCase(),
			email: email.value.toUpperCase(),
			message: message.value,
		};

		await postContactForm(data);
	};

	return (
		<div>
			<h2 style={styles.title}>Contact</h2>
			<h4 style={styles.textWrapper}>Feel free to email me directly at magdihazaa@gmail.com or fill the form below:</h4>
			<form style={styles.formWrapper} onSubmit={onSubmit}>
				<input style={styles.input} name='name' type='name' placeholder='NAME' required></input>
				<input style={styles.input} name='email' type="email" placeholder='EMAIL' required></input>
				<textarea style={styles.textarea} className='message' rows={10} placeholder='MESSAGE' required />
				<a><input type='submit' value="send" /></a>
			</form>
		</div>
	);
};

export default Contact;