import dotenv from 'dotenv';
import http from 'http';
import { Post, AllData } from '../../types';

dotenv.config();
const DROPLET_IP = process.env.DROPLET_IP;
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

const httpRequest = async (options: http.RequestOptions): Promise<any> => {
	return new Promise<any>((resolve, reject) => {
		const request = http.request(options, (response) => {
			let data = '';

			response.on('data', (chunk) => {
				data = data + chunk.toString();
			});

			response.on('end', () => {
				const body = JSON.parse(data);
				resolve(body);
			});
		});

		request.on('error', (error) => {
			reject(error);
		});

		request.end();
	});
};

const getData = async (endpoint: string) => {
	const data = await httpRequest({
		method: 'GET',
		hostname: DROPLET_IP,
		port: 1337,
		path: '/api/' + endpoint,
		headers: {
			Authorization: 'Bearer ' + STRAPI_TOKEN,
		},
	});
	return data;
};

const fetchAllData = async (): Promise<AllData> => {
	const portfolio = await getData('portfolio');
	const artistPosts: Post[] = portfolio.data.attributes.Artist;
	const writerPosts: Post[] = portfolio.data.attributes.Writer;
	const bioPage = await getData('bio-page');
	const socialMedia = await getData('social-media');

	console.log(portfolio.data);
	console.log(bioPage.data);

	const allData: AllData = {
		socialMediaLinks: {
			instagram: socialMedia.data.attributes.instagram,
		},
		bio: bioPage.data.attributes.bio,
		portfolio: {
			artist: [],
			writer: [],
		},
	};

	return allData;
};

export default fetchAllData; 