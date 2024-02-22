import dotenv from 'dotenv';
import { createClient } from '@sanity/client';

dotenv.config();

export const SANITY_STUDIO_PROJECT_TITLE = process.env.SANITY_STUDIO_PROJECT_TITLE || '';
export const SANITY_STUDIO_PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID || '';
export const SANITY_STUDIO_DATASET = process.env.SANITY_STUDIO_DATASET || 'production';

export const client = createClient({
	projectId: SANITY_STUDIO_PROJECT_ID,
	dataset: SANITY_STUDIO_DATASET,
	useCdn: false,
	apiVersion: '2023-05-03',
});

export const fetch = async (QUERY: string) => {
	const data = await client.fetch(QUERY);
	return data;
};