import dotenv from 'dotenv';
import { createClient } from '@sanity/client';

dotenv.config();

export const client = createClient({
	projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
	dataset: process.env.SANITY_STUDIO_DATASET || 'production',
	useCdn: false,
	apiVersion: '2023-05-03',
});

export const fetch = async (QUERY: string) => {
	const data = await client.fetch(QUERY);
	return data;
};