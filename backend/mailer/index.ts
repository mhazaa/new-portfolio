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
	const clientEmail = await transporter.sendMail({
		from: `"${data.name}: ${data.userId}" <${data.email}>`,
		to: process.env.EMAIL,
		subject: 'NEW PORTFOLIO EMAIL!',
		text: data.message,
		html: data.message,
	});
	
	console.log('Message sent: %s', clientEmail.messageId);
};