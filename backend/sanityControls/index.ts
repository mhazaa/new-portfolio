import dotenv from 'dotenv';
import { createClient } from '@sanity/client';

dotenv.config();

export const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;
export const SANITY_DATASET = process.env.SANITY_DATASET || 'production';

export const client = createClient({
	projectId: SANITY_PROJECT_ID,
	dataset: SANITY_DATASET,
	useCdn: false,
	apiVersion: '2022-01-12',
	//token: process.env.SANITY_SECRET_TOKEN,
});

export const fetch = async (QUERY: string) => {
	const data = await client.fetch(QUERY);
	return data;
};

/*export const createPost = async (post: Post) => {
	const result = client.create(post);
	return result;
};

export const updateDocumentTitle = async (_id, title) => {
	const result = client.patch(_id).set({title});
	return result;
};*/