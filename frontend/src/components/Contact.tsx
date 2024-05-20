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
	const [responseMessage, setResponseMessage] = useState<React.JSX.Element | null>(null);
	const [blockClick, setBlockClick] = useState<boolean>(false);

	const successfulResponseMessage =
		<h4>Thanks for reaching out! I&apos;ll get back to you as soon as I can.<br></br>
		You&apos;ll be redirected to the homepage shortly.</h4>;

	const failedResponseMessage = 
		<h4>Looks like there was a technical problem delivering your email.<br></br>
		Try again later or email me directly at magdihazaa@gmail.com<br></br></h4>;

	const styles: {
		[key: string]: CSSProperties;
	} = {
		responseMessageWrapper: {
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
		submitButton: {
			width: '100%',
		},
	};

	useEffect(() => {
		AnalyticsEngineClient.sendMetric('VIEWED_CONTACT_PAGE');
	}, []);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (blockClick) return;
		
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

		console.log('mmm', message.value);

		setBlockClick(true);

		const responseData = await postContactForm(data);

		if (responseData.status !== 200) {
			setResponseMessage(failedResponseMessage);
		} else {
			AnalyticsEngineClient.sendMetric('SENT_CONTACT_FORM');
			setResponseMessage(successfulResponseMessage);
			setTimeout(() => changePageUrl('/'), 10000);
		}
	};

	if (responseMessage) return (
		<div style={styles.responseMessageWrapper}>
			<h4>{responseMessage}</h4>
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
				<a>
					<input style={styles.submitButton} type='submit' value="send" />
				</a>
			</form>
		</div>
	);
};

export default Contact;