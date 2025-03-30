import React, { useState, useEffect, CSSProperties } from 'react';
import AnalyticsEngineClient from '@mhazaa/analytics-engine/client';
import useResponsive from '../hooks/useResponsive';
import { Pointer } from './Cursor';
import { postContactForm } from '../requests';
import { globalStyles, animations } from '../theme';
import { PostContactFormData } from '../../../types';

let _timeout: ReturnType<typeof setTimeout> | undefined;

interface ContactProps {
	setUrl: (url: string) => void;
};

const Contact: React.FC<ContactProps> = ({
	setUrl,
}) => {
	const { isMobile, isTablet } = useResponsive();
	const [responseMessage, setResponseMessage] = useState<React.JSX.Element | null>(null);
	const [blockClick, setBlockClick] = useState<boolean>(false);

	const styles: {
		[key: string]: CSSProperties;
	} = {
		responseMessageWrapper: {
			textAlign: 'center',
		},
		container: {
			textAlign: isMobile ? 'center' : 'left',
		},
		title: {
			display: 'inline-block',
			marginBottom: globalStyles.spacing.standard,
			textAlign: isMobile ? 'center' : 'left',
			...animations.titleInk({
				stroke: false,
				percentage: '110%',
			}),
		},
		textWrapper: {
			marginBottom: globalStyles.spacing.standard,
			textAlign: isMobile ? 'center' : 'left',
		},
		emailLink: {
			display: 'inline-block',
			textDecoration: 'underline',
		},
		nameEmailWrapper: {
			display: 'flex',
			flexDirection: isTablet ? 'column' : 'row',
			justifyContent: 'space-between',
		},
		input: {
			width: isTablet ? '100%' : '49%',
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

	const Email: React.FC<{responseMessage?: boolean}> = ({
		responseMessage = false,
	}) =>
		<a
			style={styles.emailLink}
			className = 'clickable'
			href='mailto:magdihazaa@gmail.com'
		>
			<Pointer>
				{responseMessage
					? <h4>magdihazaa@gmail.com</h4>
					: <h6>magdihazaa@gmail.com</h6>
				}
			</Pointer>
		</a>;

	const successfulResponseMessage =
		<>Thanks for reaching out! I&apos;ll get back to you as soon as I can.<br></br>
		You&apos;ll be redirected to the homepage shortly.</>;

	const failedResponseMessage = 
		<>Looks like there was a technical problem delivering your email.<br></br>
		Try again later or email me directly at <Email responseMessage={true} /><br></br></>;

	const pendingResponseMessage = <>Sending...</>;

	useEffect(() => {
		AnalyticsEngineClient.sendMetric('VIEWED_CONTACT_PAGE');
		return () => clearTimeout(_timeout);
	}, []);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (blockClick) return;

		setResponseMessage(pendingResponseMessage);
		
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

		setBlockClick(true);

		const responseData = await postContactForm(data);

		if (responseData.status !== 200) {
			setResponseMessage(failedResponseMessage);
		} else {
			AnalyticsEngineClient.sendMetric('SENT_CONTACT_FORM');
			setResponseMessage(successfulResponseMessage);
			_timeout = setTimeout(() => setUrl('/'), 10000);
		};
	};

	if (responseMessage) return (
		<div style={styles.responseMessageWrapper}>
			<h4>{responseMessage}</h4>
		</div>
	);

	return (
		<div style={styles.container}>
			<h2 style={styles.title} className='unselectable'>Contact</h2>
			<h6 style={styles.textWrapper}>Fill out the form below or email me directly at <Email /></h6>
			<form onSubmit={onSubmit}>
				<div style={styles.nameEmailWrapper}>
					<input
						style={styles.input}
						name='name'
						type='name'
						placeholder='NAME'
						required
					/>
					<input
						style={styles.input}
						name='email'
						type='email'
						placeholder='EMAIL'
						required
					/>
				</div>
				<textarea
					style={styles.textarea}
					className='message'
					rows={10}
					placeholder='MESSAGE'
					required
				/>
				<a>
					<Pointer>
						<input
							style={styles.submitButton}
							className='clickable'
							type='submit'
							value='send'
						/>
					</Pointer>
				</a>
			</form>
		</div>
	);
};

export default Contact;