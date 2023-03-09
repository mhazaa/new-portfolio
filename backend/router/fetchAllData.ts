import dotenv from 'dotenv';
import http from 'http';
import { Post, AllData } from '../../types';

dotenv.config();

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

const fetchAllData = async (): Promise<AllData> => {
	const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

	const posts = await httpRequest({
		method: 'GET',
		hostname: 'localhost',
		port: 1337,
		path: '/api/portfolio?populate=*',
		headers: {
			Authorization: 'bearer ' + STRAPI_TOKEN,
		},
	});

	const artistPosts: Post[] = posts.data.attributes.Artist;
	const writerPosts: Post[] = posts.data.attributes.Writer;

	const bio = await httpRequest({
		method: 'GET',
		hostname: 'localhost',
		port: 1337,
		path: '/api/bio?populate=*',
		headers: {
			Authorization: 'bearer ' + STRAPI_TOKEN,
		},
	});

	console.log(bio);

	const allData: AllData = {
		socialMediaLinks: {
			instagram: 'https://www.instagram.com/magdi_hazaa/',
		},
		bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lectus sem, consectetur in odio sit amet, pharetra sodales libero. Pellentesque molestie mollis massa, sit amet ultricies eros vestibulum id. Phasellus sit amet semper velit, ut vulputate ipsum. Etiam dignissim eros ac lacinia tempor. Morbi eu libero commodo elit blandit pulvinar. Praesent nisl lacus, scelerisque in consequat a, lobortis laoreet lectus. Vivamus ultricies risus at sagittis ultrices. Nam et mi quis leo fringilla finibus.',
		portfolio: {
			artist: artistPosts,
			writer: writerPosts,
		},
	};

	return allData;
};

export default fetchAllData; 