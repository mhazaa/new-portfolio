import { AllData, PostContactFormData, PostLikeData, PostCommentData } from '../../../types';

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

export const postLike = async (data: PostLikeData): Promise<Response> => {
	const response = await fetch('/post-like', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	console.log('postLike', response);
	return response;
};

export const postComment = async (data: PostCommentData): Promise<Response> => {
	const response = await fetch('/post-comment', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	console.log('postComment', response);
	return response;
};