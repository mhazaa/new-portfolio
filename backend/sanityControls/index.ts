import dotenv from 'dotenv';
import { createClient } from '@sanity/client';

dotenv.config();

const client = createClient({
	projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
	dataset: process.env.SANITY_STUDIO_DATASET || 'production',
	useCdn: false,
	apiVersion: '2023-05-03',
	token: process.env.SANITY_SECRET_TOKEN,
});

export const fetch = async (QUERY: string) => {
	const data = await client.fetch(QUERY);
	return data;
};

export const deleteDocument = async (documentId: string) => {
	const result = client.delete(documentId);
	return result;
};