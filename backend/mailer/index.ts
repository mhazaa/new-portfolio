import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { PostContactFormData } from '../../types';

dotenv.config();

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.GMAIL_SMTP_PASSWORD,
	},
});

export default async (data: PostContactFormData) => {

	const emailBody = `
		<b>
			<i>NAME:</i> ${data.name}<br>
			<i>USER_ID:</i> ${data.userId}<br>
			<i>EMAIL:</i> ${data.email}<br>
		</b>
		<p style="white-space: pre-wrap">${data.message}</p>
	`;
	
	const clientEmail = await transporter.sendMail({
		from: `${data.name} | ${data.userId} <${data.email}>`,
		to: process.env.EMAIL,
		subject: `NEW-PORTFOLIO EMAIL: ${data.name}`,
		html: emailBody,
	});
	
	console.log('Email sent');

	return clientEmail;
};