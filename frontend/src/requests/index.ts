import { AllData, PostContactFormData } from '../../../types';

export const getAllData = async (): Promise<AllData> => {
	const response = await fetch('/get-all-data');
	const allData = await response.json();
	console.log('getAllData', allData);
	return allData;
};

export const postContactForm = async (data: PostContactFormData): Promise<Response> => {
	const response = await fetch('/post-contact-form', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	console.log('postContactForm', response);
	return response;
};