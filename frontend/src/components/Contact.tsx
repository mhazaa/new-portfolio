import React, { useState, useEffect, CSSProperties } from 'react';
import AnalyticsEngineClient from '@mhazaa/analytics-engine/client';
import { postContactForm } from '../requests';
import globalStyles from '../theme';
import { Pages, PostContactFormData } from '../../../types';

interface ContactProps {
	changePageUrl: (pageUrl: Pages) => void;
}

const Contact: React.FC<ContactProps> = ({
	changePageUrl,
}) => {
	const [isThankYouPage, setIsThankYouPage] = useState<boolean>(false);

	const styles: {
		[key: string]: CSSProperties;
	} = {
		thankYouWrapper: {
			textAlign: 'center',
		},
		title: {
			marginBottom: globalStyles.spacing.standard,
		},
		textWrapper: {
			maxWidth: '400px',
			marginBottom: globalStyles.spacing.standard,
		},
		nameEmailWrapper: {
			display: 'flex',
			justifyContent: 'space-between',
		},
		input: {
			width: '49%',
			marginBottom: globalStyles.spacing.standard,
		},
		textarea: {
			width: '100%',
			marginBottom: globalStyles.spacing.standard,
			maxHeight: '150px',
		},
		submitWrapper: {
			display: 'flex',
			justifyContent: 'end',
		},
	};

	useEffect(() => {
		AnalyticsEngineClient.sendMetric('VIEWED_CONTACT_PAGE');
	}, []);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
		const form = e.target as HTMLFormElement;
		const name = form.querySelector('input[name="name"]') as HTMLInputElement;
		const email = form.querySelector('input[name="email"]') as HTMLInputElement;
		const message = form.querySelector('.message') as HTMLTextAreaElement;

		const data: PostContactFormData = {
			userId: AnalyticsEngineClient.getUserId(),
			name: name.value,
			email: email.value,
			message: message.value,
		};

		const resData = await postContactForm(data);
		console.log('trrrrsrsrs', resData);
		if (resData.status !== 200) return;
		AnalyticsEngineClient.sendMetric('SENT_CONTACT_FORM');
		setIsThankYouPage(true);
		setTimeout(() => changePageUrl('/'), 10000);
	};

	if (isThankYouPage) return (
		<div style={styles.thankYouWrapper}>
			<h4>
				Thanks for reaching out! I&apos;ll get back to you as soon as I can.<br></br>
				You&apos;ll be redirected to the homepage shortly.
			</h4>
		</div>
	);

	return (
		<div>
			<h2 style={styles.title}>Contact</h2>
			<h5 style={styles.textWrapper}>Feel free to email me directly at magdihazaa@gmail.com or fill the form below:</h5>
			<form onSubmit={onSubmit}>
				<div style={styles.nameEmailWrapper}>
					<input style={styles.input} name='name' type='name' placeholder='NAME' required></input>
					<input style={styles.input} name='email' type="email" placeholder='EMAIL' required></input>
				</div>
				<textarea style={styles.textarea} className='message' rows={10} placeholder='MESSAGE' required />
				<a style={styles.submitWrapper}>
					<input type='submit' value="send" />
				</a>
			</form>
		</div>
	);
};

export default Contact;